import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-current-forecast',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './current-forecast.component.html',
  styleUrl: './current-forecast.component.scss'
})
export class CurrentForecastComponent {

}
