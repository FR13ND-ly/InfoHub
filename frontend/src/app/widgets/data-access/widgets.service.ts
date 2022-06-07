import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'widgets/'

  getWidgets() {
    return this.http.get(`${this.APIUrl}get/all/`)
  }

  getWidget(id : any) {
    return this.http.get(`${this.APIUrl}get/${id}/`)
  }

  editWidget(id : any, data : any) {
    return this.http.post(`${this.APIUrl}edit/${id}/`, data)
  }
}
