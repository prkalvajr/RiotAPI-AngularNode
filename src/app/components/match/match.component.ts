import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { PlayerCardComponent } from "../player-card/player-card.component";
import { RiotService } from "../../services/riot.service"
import { Constants } from "src/app/config/constants";
import { Subscription, mergeMap, filter, catchError, switchMap, map, merge, mergeAll, concatMap, tap, mergeWith, forkJoin, zip, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface Card {
  championId: string;
  championName: string;
  summonerName: string;
  summonerId: string;
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
  cardsData: Card[] = [];
  summonerData: any;
  summonerName: string = '';
  region: string = '';

  constructor(private service: RiotService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const constants = new Constants();
    this.route.queryParams.subscribe(params => { 
      this.summonerName = params["summoner"];
      this.region = params["region"];

      const sub = this.service.fetchSummonerId(this.summonerName, this.region)
      .pipe(
        switchMap(result => this.service.fetchMatchData(result.id, this.region)),
        map(response => response.participants),
        switchMap((participants: any) => {
          console.log(participants);
          return participants.map((i: any) => {
             return zip(of(i), this.service.fetchRankData(i.summonerId, this.region));
          });
        })
      )
      .subscribe((data: any) => {
        const observer = {
          next: (data: any) => {
            debugger;

            const rIndex = data[1].findIndex((x: any) => x.queueType == "RANKED_SOLO_5x5")

            let tierHasNoRank = false;
            if (data[1][rIndex].tier == 'MASTER' || data[1][rIndex].tier == 'GRANDMASTER' || data[1][rIndex].tier == 'CHALLENGER')
            tierHasNoRank = true;

            this.cardsData.push({ championId: data[0].championId, 
              championName: 'a',//champName,
              summonerName: data[0].summonerName,
              summonerId: data[0].summonerId,
              icon: '', //iconurl,
              spell1Id: '', //spell1Url,
              spell2Id: '', //spell2Url,
              tier: data[1][rIndex].tier,
              rank: tierHasNoRank ? '' : data[1][rIndex].rank,
              leaguePoints: data[1][rIndex].leaguePoints 
            });
          }
        }

        data.subscribe(observer);

          //const championJson = this.service.getDataDragonChampion();

          //const champName = this.findKeyInJson(championJson.data, participant.championId);
          //const iconurl = constants.DDRAGON_CHAMPION_ICON_ROUTE + champName + ".png";
          //const spell1Name = this.findKeyInJson(summonerJson.data, participant.spell1Id);
          //const spell1Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell1Name + ".png";
          //const spell2Name = this.findKeyInJson(summonerJson.data, participant.spell2Id);
          //const spell2Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell2Name + ".png";
      }); 
      
      this.subscriptions.push(sub);
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
