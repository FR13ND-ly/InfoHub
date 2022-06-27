import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadListsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'read-lists/'

  getReadLists(token : any) {
    return this.http.get(`${this.APIUrl}get/all/${token}/`)
  }

  getLightReadLists(data : any) {
    return this.http.post(`${this.APIUrl}get-light/`, data)
  }

  getReadListArticles(data: any) {
    return this.http.post(`${this.APIUrl}articles/`, data)
  }

  getReadListInfo(data: any) {
    return this.http.post(`${this.APIUrl}info/`, data)
  }

  addToList(data : any) {
    return this.http.post(`${this.APIUrl}add-to-list/`, data)
  }

  addReadList(data : any) {
    return this.http.post(`${this.APIUrl}add/`, data)
  }

  editReadList(data : any, id : any) {
    return this.http.put(`${this.APIUrl}edit/${id}/`, data)
  }

  deleteReadList(url : any) {
    return this.http.delete(`${this.APIUrl}delete/${url}/`)
  }

  addView(data : any) {
    return this.http.post(`${this.APIUrl}add-view/`, data)
  }

  readLater(data : any) {
    return this.http.post(`${this.APIUrl}read-later/`, data)
  }

  removeItem(data : any) {
    return this.http.post(`${this.APIUrl}remove-item/`, data)
  }
}
