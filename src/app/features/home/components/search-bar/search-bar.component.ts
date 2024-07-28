import {AsyncPipe, NgIf} from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Observable, Subscription, debounceTime, BehaviorSubject, filter, startWith, tap} from 'rxjs';
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
  searchControl = new FormControl<string >('');
  private locationOptionsSubject = new BehaviorSubject<ICurrentWeather>(null);
  locationOptions$: Observable<ICurrentWeather> = this.locationOptionsSubject.asObservable()
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false
  constructor(private weatherService: WeatherService) { }
  ngOnInit() {

    this.searchControl.valueChanges.pipe(
      tap(() => this.isLoading = true),
      filter((value) => value !== ''),
     debounceTime(500 )
    ).subscribe((value ) =>{
      this.isLoading = true;
      if (typeof value === 'object' && value !== null) {
        this.isLoading = false;
        return;
      }
      this.getLocation(value)
    })
  }

  getLocation(searchTerm: string){
    this.subscription.add(
      this.weatherService.getLocations(searchTerm).subscribe((data: ILoaction[] ) => {
        this.getCurrentWeatherLocation(data[0].lat, data[0].lon)
      },
        error => {
          //  display toast message
          this.isLoading = false
        }
      )
    )
  }

  getCurrentWeatherLocation(latitude: number, longitude: number){
    this.subscription.add(
      this.weatherService.getCurrentWeather(latitude, longitude).subscribe((data: ICurrentWeather) => {
        console.log(data)
        this.locationOptionsSubject.next(data);
        this.isLoading = false
      })
    )
  }


  displayFn(location: ICurrentWeather): string {
    return location && location.name ? location.name : '';
  }

}
