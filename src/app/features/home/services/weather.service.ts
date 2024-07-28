import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {ILoaction, IWeeklyForecast} from '../models/location';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  public currentWeather = new BehaviorSubject<any>(null);
  public selectedWeather = new BehaviorSubject<any>(null);
  public weeklyForest =  new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getCurrentWeather(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${environment.weatherApiKey}&units=metric`)
  }

  getLocations(
    cityName: string,
    stateCode?: string,
    countryCode?: string,
    limit: number = 5
  ): Observable<ILoaction[]> {
    return this.http.get<ILoaction[]>(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},&limit=${limit}&appid=${environment.weatherApiKey}`)
      .pipe(
        map((res) =>{
          this.currentWeather.next(res)
          return res
        })
      )
  }

  getWeeklyForecast(
    latitude: number, longitude: number
  ){
    return this.http.get<{list: IWeeklyForecast[]}>(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${environment.weatherApiKey}&units=metric`)
  }

  displayErrorToast(message: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition){
    this._snackBar.open(message, 'cancel', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }
  displaySuccessToast(message: string, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition){
    this._snackBar.open(message, 'cancel', {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }


}
