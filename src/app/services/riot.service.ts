// Angular Modules 
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../config/constants';

@Injectable({
    providedIn: 'root'
}) 

export class RiotService { 
    constructor( private http: HttpClient ) { }

    fetchSummonerId(summonerName: string, region: string): Observable<any> {
        const constants = new Constants(); 
        const url = constants.summonerUrlByName + `/${region}/${summonerName}`;
        return this.http.get(url);
    }

    fetchMatchData(summonerId: string, region: string): Observable<any> {
        const constants = new Constants(); 
        return this.http.get(constants.spectateMatchUrlBySummonerId+ `/${region}/${summonerId}`);
    }

    fetchRankData(summonerId: string, region: string): Observable<any> {
        const constants = new Constants(); 
        return this.http.get(constants.rankUrlBySummonerId + `/${region}/${summonerId}`);
    }

    getDataDragonChampion() {
        const constants = new Constants(); 
        return this.http.get(constants.DDRAGON_CHAMPIONSJSON);
    }

    getDataDragonSpell() {
        const constants = new Constants(); 
        return this.http.get(constants.DDRAGON_SUMMONERJSON);
    }
}