import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchComponent } from '../match/match.component'
import { PlayerCardComponent } from "../player-card/player-card.component";
import { ApiHttpService } from "../../services/api-http.service";
import { HttpClient } from '@angular/common/http';
import { Constants } from "src/app/config/constants";
import { HttpClientTestingModule } from '@angular/common/http/testing'; 


describe('MatchComponent', () => {
    let component: MatchComponent;
    let fixture: ComponentFixture<MatchComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
        declarations: [],
        imports: [PlayerCardComponent, HttpClientTestingModule, MatchComponent],
        providers: [ApiHttpService]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchComponent);
        component = fixture.debugElement.componentInstance;
    });

    it('Should create the app', () => {
        const fixture = TestBed.createComponent(MatchComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    })

    it('Should retrieve summonerID', () => {
        let result = component.getSummonerId('prkalva');
        expect(result).toEqual('d9o65oe2nX5CSzQejFjykMetiISIujwfuHTREBMPrABHhw');  
    })

});