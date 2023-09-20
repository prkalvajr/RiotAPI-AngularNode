import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";

import { NgIf } from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { Constants } from "src/app/config/constants";  
import { HttpClient } from "@angular/common/http";

interface SearchMatch {
  summoner: FormControl<string>;
  region: FormControl<string>;
}

interface ChampionDTO {

}

@Component({
    selector: "app-home-page",
    templateUrl: "./home.component.html",
    imports: [ MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule
      , MatButtonToggleModule, ReactiveFormsModule, NgIf ],
    standalone: true,
})

export class HomeComponent {
    imageUrl: string = '';
    isSubmitting = false;
    backgroundUrl = '';
    summoner = new FormControl('', [Validators.required]);
    region = new FormControl('', [Validators.required]);
    champions: any[] = [];

    searchForm = new FormGroup<SearchMatch>({
      summoner: new FormControl('', { nonNullable: true}),
      region: new FormControl('br', { nonNullable: true})
    })

    constructor( private http: HttpClient, private readonly router: Router) { }

    ngOnInit(): void {
      const constants = new Constants();
      this.http.get(constants.DDRAGON_CHAMPIONSJSON).subscribe((data: any) => {
        const championCount = data.data ? Object.keys(data.data).length : 0;

        const obj = data.data;
        this.champions = Object.values(data.data);

        // Generate a random number between 0 and count-1
        const randomIndex = Math.floor(Math.random() * championCount);
        // Get the random champion based on the random index
        const randomChampion = this.champions[randomIndex];
        debugger;
        this.imageUrl = constants.DDRAGON_SPLASH_PATH + randomChampion.name + "_0.jpg";
        console.log('Champion selecionado aleatoriamente:', randomChampion);
        console.log(data);
        console.log("count" + championCount);
      });  
    }

    getErrorSummoner() {
      if (this.summoner.hasError('required'))
        return 'You must enter a summoner name';
  
      return '';
    }

    onSubmit() 
    { 
      const summoner = this.searchForm.get('summoner')?.value;
      const region = this.searchForm.get('region')?.value;

      if (!summoner)
        return alert("You must enter a summoner name");

      this.isSubmitting = true;

      // Match not found!
      // Go to match page.
      // void this.router.navigate(["/match/"/*, param */])
      this.isSubmitting = false;
    }
}