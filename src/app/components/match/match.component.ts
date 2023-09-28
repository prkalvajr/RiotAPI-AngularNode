import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { PlayerCardComponent } from "../player-card/player-card.component";
import { ApiHttpService } from "../../services/api-http.service"
import { Constants } from "src/app/config/constants";
import { Subscription } from 'rxjs';

@Component({
    selector: "app-match-page",
    templateUrl: "./match.component.html",
    imports: [PlayerCardComponent, NgForOf],
    standalone: true
})

export class MatchComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private service: ApiHttpService) { }

  ngOnInit(): void {
    const sub1 = this.service.fetchSummonerId('MOTUMBOSO').subscribe(
      (response1) => { 
        debugger;
        console.log('response1: ' + response1.id)
        const sub2 = this.service.fetchMatchData(response1.id).subscribe(
          (response2) => {
            debugger;
            console.log(response2);
          },
          (error2) => {
            debugger;
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

  cardsData = [
    { id: 1, playerName: 'player 1', champion: 'Jax'  , icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},  
    { id: 2, playerName: 'player 2', champion: 'Vex'  , icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 3, playerName: 'player 3', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 4, playerName: 'player 4', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 5, playerName: 'player 5', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 6, playerName: 'player 6', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 7, playerName: 'player 7', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 8, playerName: 'player 8', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 9, playerName: 'player 9', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
    { id: 10, playerName: 'player 10', champion: 'Vayne', icon: 'https://yt3.googleusercontent.com/ytc/AOPolaS2atFOTPv1qqmq5LCYxAijG19KC4yPPDo-lH1X=s900-c-k-c0x00ffffff-no-rj'},
  ];
}