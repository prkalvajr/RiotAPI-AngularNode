import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { NgIf } from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { Constants } from "src/app/config/constants";  
import { HttpClient } from "@angular/common/http";
import { NotifierService } from "../../services/notifier.service";

interface SearchMatch {
  summoner: FormControl<string>;
  region: FormControl<string>;
}

@Component({
    selector: "app-home-page",
    templateUrl: "./home.component.html",
    imports: [ MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule
      , MatButtonToggleModule, ReactiveFormsModule, NgIf ],
    standalone: true,
})

export class HomeComponent {
  constructor( private http: HttpClient,
    private toast: NotifierService,          
    private readonly router: Router) { }

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

    ngOnInit(): void {
      this.changeBackground();
    }

    changeBackground() {
      const constants = new Constants();
      this.http.get(constants.DDRAGON_CHAMPIONSJSON).subscribe((data: any) => {
        const championCount = data.data ? Object.keys(data.data).length : 0;
        this.champions = Object.values(data.data);
        const randomIndex = Math.floor(Math.random() * championCount);
        const randomChampion = this.champions[randomIndex];
        this.imageUrl = constants.DDRAGON_SPLASH_PATH + randomChampion.id + "_0.jpg";
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

      if (!summoner) {
        this.toast.showWarning("Type the summoner name");
        return;
      }
   
      this.isSubmitting = true;
      this.isSubmitting = false;
      this.toast.showError("Match not found!");
      void this.router.navigate(["/match/"/*, param */])
      //this.notifier.showSuccessMessage("error");
      return;
    }
}