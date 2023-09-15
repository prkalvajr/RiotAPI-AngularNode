import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-home-page",
    templateUrl: "./match.component.html",
    imports: [ ],
    standalone: true,
})

export class MatchComponent {

    constructor(
      private readonly router: Router
    ) {}

}