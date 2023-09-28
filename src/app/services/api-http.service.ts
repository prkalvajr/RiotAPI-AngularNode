// Angular Modules 
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../config/constants';

@Injectable({
    providedIn: 'root'
}) 

export class ApiHttpService { 
    constructor( private http: HttpClient ) { }

    fetchSummonerId(summonerName: string): Observable<any> {
        const constants = new Constants(); 
        const url = constants.summonerUrlByName + `/${summonerName}`;
        return this.http.get(url);
    }

    fetchMatchData(summonerId: string): Observable<any> {
        const constants = new Constants(); 
        return this.http.get(constants.spectateMatchUrlBySummonerId+ `/${summonerId}`);
    }
}