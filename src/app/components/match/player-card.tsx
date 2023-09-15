import 'zone.js';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';


// describe component
@Component({
  selector: 'player-card', // component name used in markup
  standalone: true, // component is self-contained
  template: // the component's markup
  `
    <mat-card class="card">
    <mat-card-header>
      <div mat-card-avatar class="header-image"></div>
      <mat-card-title>Mercedes-Benz 360c</mat-card-title>
      <mat-card-subtitle>Automobile</mat-card-subtitle>
    </mat-card-header>
    <img mat-card-image src="https://images.theconversation.com/files/274334/original/file-20190514-60570-gfti2h.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop" alt="Photo of a Mercedes-Benz">
    <mat-card-content>
    <p>
      The unique 360-degree view feature on CarDekho lets you explore a car from each and every angle on your mobile device.
      Take a detailed tour of a car's exterior and interior without having to visit a showroom! For the best experience,
        download the CarDekho app.
    </p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button>SHARE</button>
   </mat-card-actions>
    </mat-card>
  `,
})

// export component
export class PlayerCard {
  count = 0;
}

bootstrapApplication(PlayerCard);


