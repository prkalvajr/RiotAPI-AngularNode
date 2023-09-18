import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
    selector: "app-home-page",
    templateUrl: "./home.component.html",
    imports: [ MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatButtonToggleModule ],
    standalone: true,
})

export class HomeComponent {

    constructor(
      private readonly router: Router
    ) {}

}