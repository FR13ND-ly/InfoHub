import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  public getCurrentPosition$ = new Observable(observer => {
    navigator.geolocation.getCurrentPosition(
        position => {
            observer.next(`${position.coords.latitude},${position.coords.longitude}`);
            observer.complete();
        },
        () => {
          observer.next("Iasi");
          observer.complete();
        }
      );
    });

  getWeather(loc : string) {
    if (environment.production) {
      return this.http.get(`https://api.weatherapi.com/v1/current.json?key=143babf1649a4a7a83572528222206&q=${loc}&aqi=no`)
    }
    else {
      return of({
        "location": {
          "name": "Iasi",
          "region": "Iasi",
          "country": "Romania",
          "lat": 47.17,
          "lon": 27.6,
          "tz_id": "Europe/Bucharest",
          "localtime_epoch": 1655883243,
          "localtime": "2022-06-22 10:34"
        },
        "current": {
          "last_updated_epoch": 1655883000,
          "last_updated": "2022-06-22 10:30",
          "temp_c": 19,
          "temp_f": 66.2,
          "is_day": 1,
          "condition": {
            "text": "Sunny",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
            "code": 1000
          },
          "wind_mph": 21.7,
          "wind_kph": 34.9,
          "wind_degree": 300,
          "wind_dir": "WNW",
          "pressure_mb": 1007,
          "pressure_in": 29.74,
          "precip_mm": 0,
          "precip_in": 0,
          "humidity": 43,
          "cloud": 0,
          "feelslike_c": 19,
          "feelslike_f": 66.2,
          "vis_km": 10,
          "vis_miles": 6,
          "uv": 4,
          "gust_mph": 28.4,
          "gust_kph": 45.7
        }
      })
    }
  }
}
