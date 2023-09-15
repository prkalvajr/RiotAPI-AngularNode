import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-home-page",
    templateUrl: "./home.component.html",
    imports: [ ],
    standalone: true,
})

export class HomeComponent {

    constructor(
      private readonly router: Router
    ) {}

}