import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HourlyForecastComponent } from "../hourly-forecast/hourly-forecast.component";

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule, HourlyForecastComponent],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss'
})
export class WeeklyForecastComponent {
}
