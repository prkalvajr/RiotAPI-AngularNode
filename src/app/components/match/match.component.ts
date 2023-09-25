import { Component } from "@angular/core";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { PlayerCardComponent } from "../player-card/player-card.component";
import { ApiHttpService } from "../../services/api-http.service"
import { Constants } from "src/app/config/constants";

@Component({
    selector: "app-match-page",
    templateUrl: "./match.component.html",
    imports: [PlayerCardComponent, NgForOf],
    standalone: true
})

export class MatchComponent {

  constructor(private service: ApiHttpService) {
    
  }

  ngOnInit(): void {
    this.getLiveGame(this.getSummonerId('prkalva'));
  }

  // SERA NECESSARIO CRIAR UM BACK END PARA BUSCAR E RETORNAR O JSON COM OS DADOS DA RIOT
  // DEVIDO AO CORS
  // TENTAR COM C#...

  getLiveGame(encryptedSummonerId: string): void {
    const constants = new Constants(); 
    // i must send authorization
    this.service.get(constants.BR1SERVER +
       '/lol/spectator/v4/active-games/by-summoner/{encryptedSummonerId}' + encryptedSummonerId);

  }

  getSummonerId(SummonerName: string): string {
    const constants = new Constants(); 
    const url = constants.BR1SERVER + "/lol/summoner/v4/summoners/by-name/" + SummonerName;
    let result = this.service.get(url);
    return "";
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