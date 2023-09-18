import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import { NgIf } from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

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
    isSubmitting = false;
    backgroundUrl = '';
    summoner = new FormControl('', [Validators.required]);
    region = new FormControl('', [Validators.required]);

    searchForm = new FormGroup<SearchMatch>({
      summoner: new FormControl('', { nonNullable: true}),
      region: new FormControl('br', { nonNullable: true})
    })

    constructor( private readonly router: Router) { }

    ngOnInit(): void {
      
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

      // void this.router.navigate(["/match/"/*, param */])
      this.isSubmitting = false;
    }
}