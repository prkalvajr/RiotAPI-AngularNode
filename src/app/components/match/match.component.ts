import { Component } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { PlayerCardComponent } from "../player-card/player-card.component";

@Component({
    selector: "app-match-page",
    templateUrl: "./match.component.html",
    imports: [PlayerCardComponent, NgForOf],
    standalone: true
})

export class MatchComponent {

  constructor() {}

  // Get and format data from API
  // icon...
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