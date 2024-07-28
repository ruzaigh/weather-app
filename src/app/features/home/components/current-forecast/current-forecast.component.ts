import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {WeatherService} from "../../services/weather.service";
import { Subscription} from "rxjs";
import {AsyncPipe, DatePipe, DecimalPipe} from "@angular/common";
import {ICurrentWeather} from "../../models/location";

@Component({
  selector: 'app-current-forecast',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, DatePipe, DecimalPipe],
  templateUrl: './current-forecast.component.html',
  styleUrl: './current-forecast.component.scss'
})
export class CurrentForecastComponent {
  private currentWeatherSub:  Subscription
  public currentWeather: ICurrentWeather
  public currentDate: Date = new Date()

  constructor(private weatherService: WeatherService) {
    this.currentDate.getDate()
  }

  ngAfterViewInit(){
      this.currentWeatherSub = this.weatherService.selectedWeather
        .subscribe((res: ICurrentWeather) => {
          this.currentWeather = res;
        })
  }
  ngOnDestroy() {
    this.currentWeatherSub.unsubscribe()
  }
}
