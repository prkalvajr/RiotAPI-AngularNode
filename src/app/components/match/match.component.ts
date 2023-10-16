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
  summonerName: string = '';
  region: string = '';

  champion: any;
  spells: any;


  constructor(private service: RiotService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const constants = new Constants(); 
    const sub = this.route.queryParams.pipe(
        switchMap(qs => {
          this.summonerName = qs["summoner"];
          this.region = qs["region"];
          return this.service.fetchSummonerId(this.summonerName, this.region)
        }),
        tap(data => {   // can i do it without subscribe?
          this.service.getDataDragonChampion().subscribe({
            next: (data) => {
              this.champion = data;
            }
          })
          this.service.getDataDragonSpell().subscribe({
            next: (data) => {
              this.spells = data;
            }
          })
          return data;
        }),
        switchMap(result => this.service.fetchMatchData(result.id, this.region)),
        map(response => response.participants),
        switchMap((participants: any) => {
          return participants.map((i: any) => {
             return zip(of(i), this.service.fetchRankData(i.summonerId, this.region));
          });
        })
      )
      .subscribe((data: any) => {
        const observer = {
          next: (data: any) => {
            debugger;
            console.log(this.champion);
            console.log(this.spells);

            const rIndex = data[1].findIndex((x: any) => x.queueType == "RANKED_SOLO_5x5")
            let tierHasNoRank = false;
            if (data[1][rIndex].tier == 'MASTER' || data[1][rIndex].tier == 'GRANDMASTER' || data[1][rIndex].tier == 'CHALLENGER')
            tierHasNoRank = true;

            const champName = this.findKeyInJson(this.champion.data, data[0].championId);
            const iconurl = constants.DDRAGON_CHAMPION_ICON_ROUTE + champName + ".png";
            const spell1Name = this.findKeyInJson(this.spells.data, data[0].spell1Id);
            const spell1Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell1Name + ".png";
            const spell2Name = this.findKeyInJson(this.spells.data, data[0].spell2Id);
            const spell2Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell2Name + ".png";

            this.cardsData.push({ championId: data[0].championId, 
              championName: champName,
              summonerName: data[0].summonerName,
              summonerId: data[0].summonerId,
              icon: iconurl,
              spell1Id: spell1Url, 
              spell2Id: spell2Url,
              tier: data[1][rIndex].tier,
              rank: tierHasNoRank ? '' : data[1][rIndex].rank,
              leaguePoints: data[1][rIndex].leaguePoints 
            });
          }
        }

        data.subscribe(observer);
      }); 
      
      this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
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
