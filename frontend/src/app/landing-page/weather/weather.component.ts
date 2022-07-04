import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class WeatherComponent {

  constructor(private weatherService : WeatherService) { }

  weather$ : Observable<any> = this.weatherService.getCurrentPosition$.pipe(
    switchMap((position : any) => this.weatherService.getWeather(position))
  )
}
