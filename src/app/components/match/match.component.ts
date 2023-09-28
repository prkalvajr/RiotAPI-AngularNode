import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { PlayerCardComponent } from "../player-card/player-card.component";
import { ApiHttpService } from "../../services/api-http.service"
import { Constants } from "src/app/config/constants";
import { Subscription } from 'rxjs';

interface Particpant {
  championId: string;
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

  constructor(private service: ApiHttpService) { }

  ngOnInit(): void {
    const sub1 = this.service.fetchSummonerId('MOTUMBOSO').subscribe(
      (response1) => { 
        console.log('response1: ' + response1.id)
        const sub2 = this.service.fetchMatchData(response1.id).subscribe(
          (response2) => {
            response2.participants.map((participant: { championId: string; summonerName: string }) => {
                this.cardsData.push({ championId: participant.championId, 
                                      summonerName: participant.summonerName,
                                      icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'
                                    });
            })
          },
          (error2) => {
            console.log('error getting match data:', error2)
          }
          );
          // Add sub2 to the subscriptions array
          this.subscriptions.push(sub2);
        },
        (error1) => {
          console.error('Error in fetchSummonerId:', error1);
        }
      );
    // Add sub1 to the subscriptions array
    this.subscriptions.push(sub1);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}