import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchComponent } from '../match/match.component'
import { PlayerCardComponent } from "../player-card/player-card.component";
import { ApiHttpService } from "../../services/api-http.service"
import { HttpClient } from '@angular/common/http';
import { Constants } from "src/app/config/constants";
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule


describe('MatchComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [],
        imports: [PlayerCardComponent, HttpClientTestingModule, MatchComponent],
        providers: [ApiHttpService]
    }));
    

    it('Should create the app', () => {
        const fixture = TestBed.createComponent(MatchComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    })

});