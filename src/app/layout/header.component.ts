import { Component, } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from "@angular/router";

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  imports: [ MatToolbarModule ],
  standalone: true,
})

export class HeaderComponent {

  constructor(private readonly router: Router) {}

  goHome() {
    void this.router.navigate(["/home"/*, param */])
  }
    
}