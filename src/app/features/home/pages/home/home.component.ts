import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';
import { CurrentForecastComponent } from "../../components/current-forecast/current-forecast.component";
import { AttributeComponent } from "../../components/attribute/attribute.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TemperatureGraphComponent } from "../../components/temperature-graph/temperature-graph.component";
import { WeeklyForecastComponent } from "../../components/weekly-forecast/weekly-forecast.component";
import {ICurrentWeather} from "../../models/location";
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrentForecastComponent, AttributeComponent, SearchBarComponent, TemperatureGraphComponent, WeeklyForecastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  public selectedLocation: ICurrentWeather
  private subscription: Subscription = new Subscription();
  refreshInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private weatherService: WeatherService) {
    this.getLocation()
    this.startRefreshInterval();
  }
  startRefreshInterval() {
    this.refreshInterval = setInterval(() => {
      this.getCurrentWeather();
    },  5 * 60 *1000);
  }
  stopRefreshInterval() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
  getCurrentWeather() {
    if(this.selectedLocation){
      this.weatherService.getCurrentWeather(this.selectedLocation.coord.lat, this.selectedLocation.coord.lon).subscribe(
        (data: ICurrentWeather) => {
          this.selectedLocation = data;
          this.weatherService.selectedWeather.next(data)
        },
        (error) => {
          this.weatherService.displayErrorToast('Failed to fetch weather data.',this.horizontalPosition, this.verticalPosition)
        }
      );
    }

  }


  getLocation(){
    let currentLocation = localStorage.getItem('currentLocation');
    if (!currentLocation) {
      this.subscription.add(
        this.weatherService.selectedWeather.subscribe(res => this.selectedLocation = res)
      )
    }else{
      this.selectedLocation =JSON.parse(currentLocation);
      this.weatherService.selectedWeather.next(this.selectedLocation)
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.stopRefreshInterval();
  }
}
