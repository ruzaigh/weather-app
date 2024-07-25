import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Loaction } from '../models/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(latitude: number, longitude: number){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${environment.weatherApiKey}`)
  }

  getLocations(
    cityName: string,
    stateCode?: string,
    countryCode?: string,
    limit: number = 5
  ): Observable<Loaction[]> {
    return this.http.get<Loaction[]>(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${limit}&appid=${environment.weatherApiKey}`)
  }
}
