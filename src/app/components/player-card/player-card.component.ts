import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  imports: [MatCardModule],
  standalone: true
})

export class PlayerCardComponent {
  @Input() data: any;
}         