import { Injectable } from '@angular/core'; 

@Injectable() 

export class Constants {
    public readonly DDRAGON_SPLASH_PATH = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/'; // + Champion name ex:Annie_0.jpg
    public readonly DDRAGON_CHAMPIONSJSON = 'http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json'; 
} 
