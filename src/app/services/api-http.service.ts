// Angular Modules 
import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable({
    providedIn: 'root'
}) 

export class ApiHttpService { 
    constructor( 
    private http: HttpClient 
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    public get(url: string, options?: any) { 
        return this.http.get(url, options); 
    }

    public post(url: string, data: any, options?: any) { 
        return this.http.post(url, data, options); 
    }

    public put(url: string, data: any, options?: any) { 
        return this.http.put(url, data, options); 
    }

    public delete(url: string, options?: any) { 
        return this.http.delete(url, options); 
    } 
}