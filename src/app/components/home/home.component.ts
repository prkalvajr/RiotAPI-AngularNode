import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl,  FormGroup,  ReactiveFormsModule,  Validators,} from "@angular/forms";
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
    imports: [ MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatButtonToggleModule, ReactiveFormsModule ],
    standalone: true,
})

export class HomeComponent {
[x: string]: any;

    isSubmitting = false

    searchForm = new FormGroup<SearchMatch>({
      summoner: new FormControl("", { nonNullable: true}),
      region: new FormControl("", { nonNullable: true})
    })

    constructor(private readonly router: Router) { }

    onSubmit() 
    { 
      this.isSubmitting = true;
      const summoner = this.searchForm.get('summoner')?.value;
      const region = this.searchForm.get('region')?.value;

      // void this.router.navigate(["/match/"/*, param */])
    }
}