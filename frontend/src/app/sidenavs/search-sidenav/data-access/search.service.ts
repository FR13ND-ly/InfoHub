import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'articles/search/'

  search(text : string) {
    return this.http.post(this.APIUrl, {text})
  }
}
