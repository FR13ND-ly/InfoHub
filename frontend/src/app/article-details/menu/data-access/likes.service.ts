import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'likes/'

  getLikes(data : any) {
    return this.http.post(`${this.APIUrl}get/`, data)
  }

  interact(data : any) {
    return this.http.post(`${this.APIUrl}interact/`, data)
  }
}
