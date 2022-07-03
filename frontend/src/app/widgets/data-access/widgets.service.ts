import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Widget } from 'src/app/core/models/widget.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'widgets/'

  getWidgets() : Observable<Widget[]> {
    return <Observable<Widget[]>>this.http.get(`${this.APIUrl}get/all/`)
  }

  getWidget(id : number) : Observable<Widget> {
    return <Observable<Widget>>this.http.get(`${this.APIUrl}get/${id}/`)
  }

  editWidget(id : number, widget : Widget) {
    return this.http.post(`${this.APIUrl}edit/${id}/`, widget)
  }
}
