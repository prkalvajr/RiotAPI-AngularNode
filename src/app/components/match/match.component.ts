import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { PlayerCardComponent } from "../player-card/player-card.component";
import { RiotService } from "../../services/riot.service"
import { HttpClient } from "@angular/common/http";
import { Constants } from "src/app/config/constants";
import { Subscription, mergeMap, filter, catchError, switchMap, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


interface Particpant {
  championId: string;
  championName: string;
  summonerName: string;
  icon: string;
  spell1Id: string;
  spell2Id: string;
  rank: string;
  tier: string;
  leaguePoints: string
}

@Component({
    selector: "app-match-page",
    templateUrl: "./match.component.html",
    imports: [PlayerCardComponent, NgForOf],
    standalone: true
})

export class MatchComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  cardsData: Particpant[] = [];
  summonerName: string = '';
  region: string = '';

  constructor(private service: RiotService,
              private http: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const constants = new Constants();
    this.route.queryParams.subscribe(params => { 

      this.summonerName = params["summoner"];
      this.region = params["region"];


      const sub = this.service.fetchSummonerId(this.summonerName, this.region)
      .pipe(
        mergeMap(result => this.service.fetchMatchData(result.id, this.region)),
        mergeMap(result2 => this.http.get(constants.DDRAGON_CHAMPIONSJSON)),
        mergeMap(result3 => this.http.get(constants.DDRAGON_SUMMONERJSON))

      )
      .subscribe((data) => {
        debugger;
        console.log(data);
      });


      const sub1 = this.service.fetchSummonerId(this.summonerName, this.region)
      .pipe(
        map((summonerInfo) => {
          return this.service.fetchMatchData(summonerInfo.id, this.region);
        })
      )
      .subscribe((data) => {
        data.subscribe((matchData) => {

          // Melhorar para baixo
          const sub3 = this.http.get(constants.DDRAGON_CHAMPIONSJSON).subscribe(
            (championJson: any) => {

              const sub4 = this.http.get(constants.DDRAGON_SUMMONERJSON).subscribe(
                (summonerJson: any) => {

                  matchData.participants.map((participant: { summonerId: string; championId: string; summonerName: string;
                    spell1Id: string; spell2Id: string; }) => {

                      const sub5 = this.service.fetchRankData(participant.summonerId, this.region).subscribe(
                        (rankJson: any) => {

                          const champName = this.findKeyInJson(championJson.data, participant.championId);
                          const iconurl = constants.DDRAGON_CHAMPION_ICON_ROUTE + champName + ".png";
                          const spell1Name = this.findKeyInJson(summonerJson.data, participant.spell1Id);
                          const spell1Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell1Name + ".png";
                          const spell2Name = this.findKeyInJson(summonerJson.data, participant.spell2Id);
                          const spell2Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell2Name + ".png";

                          let tierHasNoRank = false;
                          if (rankJson[0].tier == 'MASTER' || rankJson[0].tier == 'GRANDMASTER' || rankJson[0].tier == 'CHALLENGER')
                            tierHasNoRank = true;

                          this.cardsData.push({ championId: participant.championId, 
                                                championName: champName,
                                                summonerName: participant.summonerName,
                                                icon: iconurl,
                                                spell1Id: spell1Url,
                                                spell2Id: spell2Url,
                                                tier: rankJson[0].tier,
                                                rank: tierHasNoRank ? '' : rankJson[0].rank,
                                                leaguePoints: rankJson[0].leaguePoints });

                        },
                        (error5) => {
                          console.log('error getting rank:', error5)
                        })
                        this.subscriptions.push(sub5);
                    });
                },
                (error4) => {
                  console.log("error reading summoner spells Json")
                });
                this.subscriptions.push(sub4);
            },
            (error3) => {
              console.log('error reading champions Json:', error3)
            });
            this.subscriptions.push(sub3); 
          
        })
      })
    })  
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  findKeyInJson(jsonObject: any, keyName: string): string {
    for (const key in jsonObject) {
      if (jsonObject[key].key == keyName) {
        return jsonObject[key].id;
      }
    }

    return '';
  }

}
