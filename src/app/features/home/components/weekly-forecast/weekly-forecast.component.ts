import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HourlyForecastComponent } from "../hourly-forecast/hourly-forecast.component";
import {Subscription} from "rxjs";
import {ICurrentWeather, IWeeklyForecast} from "../../models/location";
import {WeatherService} from "../../services/weather.service";
import {DatePipe, DecimalPipe} from "@angular/common";

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule, HourlyForecastComponent, DatePipe, DecimalPipe],
  templateUrl: './weekly-forecast.component.html',
  styleUrl: './weekly-forecast.component.scss'
})
export class WeeklyForecastComponent {
  private currentWeatherSub: Subscription
  public currentWeather: ICurrentWeather
  public weeklyForest: Array<{
    date: string,
    minTemp: number,
    maxTemp: number,
    weather: Array<{
      id: number,
      main: string,
      description: string,
      icon: string
    }>,
    dayForecast: Array<IWeeklyForecast>
  }>


  constructor(private weatherService: WeatherService) {}
  ngAfterViewInit(){
    this.currentWeatherSub = this.weatherService.selectedWeather
      .subscribe((res: ICurrentWeather) =>{
        this.currentWeather = res
        this.getWeeklyForecast()
      })
  }

  getWeeklyForecast(){
    this.weatherService.getWeeklyForecast( this.currentWeather.coord.lat,  this.currentWeather.coord.lon)
      .subscribe((res:{list: IWeeklyForecast[]})=> {
        this.weeklyForest = this.groupByDate(res.list);
        this.weatherService.weeklyForest.next(this.weeklyForest);
      })
  }

  groupByDate(forecastList: IWeeklyForecast[]) {
    const grouped = forecastList.reduce((acc, current) => {
      const date = current.dt_txt.split(' ')[0]; // Extract the date part (YYYY-MM-DD)

      // Check if the date already exists in the accumulator
      let dateEntry = acc.find(entry => entry.date === date);
      if (!dateEntry) {
        // If it doesn't exist, create a new entry
        dateEntry = {
          date: date,
          dayForecast: []
        };
        acc.push(dateEntry);
      }
      // Push the relevant data into the grouped object
      dateEntry.dayForecast.push(current);

      return acc;
    }, []);

    return grouped.map(entry => ({
      date: entry.date,
      minTemp: entry.dayForecast[0].main.temp_max,
      maxTemp: entry.dayForecast[0].main.temp_min,
      weather: entry.dayForecast[0].weather,
      dayForecast: entry.dayForecast
    }));
  }

  ngOnDestroy() {
    this.currentWeatherSub.unsubscribe()
  }
}
