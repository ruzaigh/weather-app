import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {ICurrentWeather} from "../../models/location";
import {Subscription} from "rxjs";
import {WeatherService} from "../../services/weather.service";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [MatCardModule, DatePipe, DecimalPipe],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent {
  private currentWeatherSub: Subscription
  public currentWeather: ICurrentWeather
  constructor(private weatherService: WeatherService) {}
  ngAfterViewInit(){
    this.currentWeatherSub = this.weatherService.selectedWeather
      .subscribe((res: ICurrentWeather) =>{
        this.currentWeather = res
      })
  }
  ngOnDestroy() {
    this.currentWeatherSub.unsubscribe()
  }
}
