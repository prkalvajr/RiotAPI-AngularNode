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
 


        //zip(this.service.fetchRankData)
        //zip(participants => { 
        //  return zip(participants.map((i: { summonerId: string; }) => 
        //  this.service.fetchRankData(i.summonerId, this.region))
        //)})        
        
        //TESTAR
      

      .subscribe((data: any) => {

        const observer = {
          next: (rank: any) => {
            debugger;
              const rIndex = rank.findIndex((x: any) => x.queueType == "RANKED_SOLO_5x5")
              const index = this.cardsData.findIndex((x) => x.summonerId == rank[rIndex].summonerId)

              let tierHasNoRank = false;
              if (rank[0].tier == 'MASTER' || rank[0].tier == 'GRANDMASTER' || rank[0].tier == 'CHALLENGER')
              tierHasNoRank = true;
              
              this.cardsData[index].tier = rank[rIndex].tier;
              this.cardsData[index].rank = tierHasNoRank ? '' : rank[rIndex].rank;
              this.cardsData[index].leaguePoints = rank[rIndex].leaguePoints;
          }
        }

        data.subscribe(observer);

        //data.map((participant: { summonerId: string; championId: string; summonerName: string;
          //spell1Id: string; spell2Id: string; }) => {

          const championJson = this.service.getDataDragonChampion();
          //const champName = this.findKeyInJson(championJson.data, participant.championId);
          //const iconurl = constants.DDRAGON_CHAMPION_ICON_ROUTE + champName + ".png";
          //const spell1Name = this.findKeyInJson(summonerJson.data, participant.spell1Id);
          //const spell1Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell1Name + ".png";
          //const spell2Name = this.findKeyInJson(summonerJson.data, participant.spell2Id);
          //const spell2Url = constants.DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE + spell2Name + ".png";

          /*
          this.cardsData.push({ championId: participant.championId, 
            championName: 'a',//champName,
            summonerName: participant.summonerName,
            summonerId: participant.summonerId,
            icon: '', //iconurl,
            spell1Id: '', //spell1Url,
            spell2Id: '', //spell2Url,
            tier: '', //rankJson[0].tier,
            rank: '', //tierHasNoRank ? '' : rankJson[0].rank,
            leaguePoints: '' //rankJson[0].leaguePoints 
          });

          this.service.fetchRankData(participant.summonerId, this.region).subscribe(rankObserver);
        });
        */
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
