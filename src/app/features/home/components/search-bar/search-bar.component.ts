import {AsyncPipe, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Observable, Subscription, debounceTime, BehaviorSubject, filter, tap} from 'rxjs';
import {WeatherService} from "../../services/weather.service";
import {ICurrentWeather, ILoaction} from "../../models/location";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MatProgressSpinner,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  public searchControl = new FormControl<string >('');
  private locationOptionsSubject = new BehaviorSubject<ICurrentWeather>(null);
  public locationOptions$: Observable<ICurrentWeather> = this.locationOptionsSubject.asObservable()
  private subscription: Subscription = new Subscription();
  public isLoading: boolean = false
  constructor(private weatherService: WeatherService) { }
  ngOnInit() {

    this.searchControl.valueChanges.pipe(
      filter((value) => value !== ''),
      tap(() => this.isLoading = true),
     debounceTime(300 )
    ).subscribe((value ) =>{
      if (typeof value === 'object' && value !== null ) {
        this.isLoading = false;
        return;
      }
      this.getLocation(value)
    })
  }

  getLocation(searchTerm: string){
      this.subscription.add(
        this.weatherService.getLocations(searchTerm)
          .subscribe(
            (data: ILoaction[]) => {
              this.getCurrentWeatherLocation(data[0].lat, data[0].lon);
            },
            (error) => {
              this.isLoading = false;
            }
          )
      );
  }

  getCurrentWeatherLocation(latitude: number, longitude: number){
    this.subscription.add(
      this.weatherService.getCurrentWeather(latitude, longitude)
        .subscribe((data: ICurrentWeather) => {
        this.locationOptionsSubject.next(data);
        this.isLoading = false
      },
          (error) =>{
            this.isLoading = false;
          })
    )
  }

  setLocation(location:ICurrentWeather){
    localStorage.setItem('currentLocation', JSON.stringify(location));
    this.weatherService.selectedWeather.next(location)
    this.isLoading = false;
  }


  displayFn(location: ICurrentWeather): string {
    return location && location.name ? location.name : '';
  }

}
