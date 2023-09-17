import { Component, } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  imports: [ MatToolbarModule ],
  standalone: true,
})

export class HeaderComponent {
    
}