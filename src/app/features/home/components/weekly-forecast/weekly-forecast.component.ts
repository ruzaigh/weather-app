import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss'
})
export class WeeklyForecastComponent {

}
