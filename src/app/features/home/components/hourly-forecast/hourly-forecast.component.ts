import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {IWeeklyForecast} from "../../models/location";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [MatCardModule, DatePipe, DecimalPipe],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.scss'
})
export class HourlyForecastComponent {
  @Input()hourlyForecast: IWeeklyForecast

}
