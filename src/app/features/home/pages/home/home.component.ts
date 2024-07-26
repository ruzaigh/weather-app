import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';
import { Loaction } from '../../models/location';
import { CurrentForecastComponent } from "../../components/current-forecast/current-forecast.component";
import { AttributeComponent } from "../../components/attribute/attribute.component";
import { HourlyForecastComponent } from "../../components/hourly-forecast/hourly-forecast.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { TemperatureGraphComponent } from "../../components/temperature-graph/temperature-graph.component";
import { WeeklyForecastComponent } from "../../components/weekly-forecast/weekly-forecast.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrentForecastComponent, AttributeComponent, HourlyForecastComponent, SearchBarComponent, TemperatureGraphComponent, WeeklyForecastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private subscription: Subscription = new Subscription();
  constructor(private weatherService: WeatherService) { }


  ngOnInit(){
    // this.getLocation()
  }
  getLocation(){
    this.subscription.add(
    this.weatherService.getLocations('Cape Town').subscribe((data: Loaction[] ) => {
     this.getCurrentWeatherLocation(data[0].lat, data[0].lon)
    })
  )
  }

  getCurrentWeatherLocation(latitude: number, longitude: number){
    this.subscription.add(
      this.weatherService.getCurrentWeather(latitude, longitude).subscribe((data) => {
        console.log(data)
      })
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
