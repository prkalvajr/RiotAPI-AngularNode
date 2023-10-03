import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { PlayerCardComponent } from "../player-card/player-card.component";
import { RiotService } from "../../services/riot.service"
import { HttpClient } from "@angular/common/http";
import { Constants } from "src/app/config/constants";
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface Particpant {
  championId: string;
  championName: string;
  summonerName: string;
  icon: string;
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
    this.route.queryParams
      .subscribe(params => {
        this.summonerName = params["summoner"];
        this.region = params["region"];
        const sub1 = this.service.fetchSummonerId(this.summonerName, this.region).subscribe(
          (summonerInfo) => { 
            const sub2 = this.service.fetchMatchData(summonerInfo.id, this.region).subscribe(
              (matchData) => {
    
                const sub3 = this.http.get(constants.DDRAGON_CHAMPIONSJSON).subscribe(
                  (data: any) => {
                    
                    matchData.participants.map((participant: { championId: string; summonerName: string }) => {
    
                      const champName = this.findChampionName(data.data, participant.championId);
                      const iconurl = constants.DDRAGON_CHAMPION_ICON_ROUTE + champName + ".png";
    
                      this.cardsData.push({ championId: participant.championId, 
                                            championName: champName,
                                            summonerName: participant.summonerName,
                                            icon: iconurl  });
                    })
                  },
                  (error3) => {
                    console.log('error reading champions Json:', error3)
                  });
                  this.subscriptions.push(sub3);          
              },
              (error2) => {               
                console.log('error getting match data:', error2)
              }
              );
              this.subscriptions.push(sub2);
            },
            (error1) => {
              console.error('Error in fetchSummonerId:', error1);
            }
          );
        this.subscriptions.push(sub1);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  findChampionName(jsonObject: any, championId: string): string {
    for (const key in jsonObject) {
      if (jsonObject[key].key == championId) {
        return jsonObject[key].id;
      }
    }

    return '';
  }

}
