import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getPreviousDay(date = new Date()) : string {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return `${previous.getFullYear()}-${previous.getMonth()}-${previous.getDate()}`
  }

  getCurrency(day : string) : Observable<any> {
    return this.http.get(`https://api.exchangerate.host/${day}?base=RON`)
  }

}
