import { Component } from '@angular/core';
import { NgxChartsModule }from '@swimlane/ngx-charts';
@Component({
  selector: 'app-temperature-graph',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './temperature-graph.component.html',
  styleUrl: './temperature-graph.component.scss'
})
export class TemperatureGraphComponent {
  title = 'barchartApp';

  dataset = [
    {
      "name": "max",
      "series": [
        {
          "name": "Mon",
          "value":30,
        },
        {
          "name": "Tue",
          "value": 21,
        },
        {
          "name": "Wed",
          "value":18,
        },
        {
          "name": "Thur",
          "value": 24,
        },
        {
          "name": "Fri",
          "value": 22,
        },
      ]
    },
    {
      "name": "min",
      "series": [
        {
          "name": "Mon",
          "value":22,
        },
        {
          "name": "Tue",
          "value": 14,
        },
        {
          "name": "Wed",
          "value":12,
        },
        {
          "name": "Thur",
          "value": 19,
        },
        {
          "name": "Fri",
          "value": 18,
        },
      ]
    },
  ];
}
