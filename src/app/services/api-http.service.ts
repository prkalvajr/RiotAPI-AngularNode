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
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:4200'
        })
    };

    public get(url: string, options?: any) 
    { 
        const riot = 'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/prkalva';
        this.http.get(url).subscribe(
            {
                next: (response) => {
                    console.log(response);
                },
                error: (erro) => {
                        alert("Usuário ou Senha inválido(s)!");
                        console.log(erro)
                },
                complete: () => {
                    console.log("complete");
                }
            }
        )       
        return '';
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