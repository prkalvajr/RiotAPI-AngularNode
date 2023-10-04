import { Injectable } from '@angular/core'; 

@Injectable() 

export class Constants {
    public readonly DDRAGON_SPLASH_PATH = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'; // + Annie_0.jpg
    public readonly DDRAGON_CHAMPION_ICON_ROUTE = 'http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/'; // + Aatrox.png
    public readonly DDRAGON_CHAMPION_SUMMONERSPELL_ROUTE = 'http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/';// + SummonerFlash.png
    public readonly DDRAGON_CHAMPIONSJSON = 'http://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json'; 
    public readonly DDRAGON_SUMMONERJSON = 'http://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/summoner.json';

    public readonly summonerUrlByName = 'http://localhost:4201/summoner';
    public readonly spectateMatchUrlBySummonerId = 'http://localhost:4201/match';
    public readonly rankUrlBySummonerId = 'http://localhost:4201/rank';
} 
