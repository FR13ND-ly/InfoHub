import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadListsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'read-lists/'

  getReadLists(user : any) {
    return this.http.post(`${this.APIUrl}get/all`, user)
  }

  getLightReadLists(user : any) {
    return this.http.post(`${this.APIUrl}get-light/`, user)
  }

  getReadListArticles(url: string) {
    return this.http.get(`${this.APIUrl}articles/${url}/`)
  }

  getReadListInfo(url: string) {
    return this.http.get(`${this.APIUrl}info/${url}/`)
  }

  addReadList(data : any) {
    return this.http.post(`${this.APIUrl}add/`, data)
  }

  editReadList(data : any) {
    return this.http.put(`${this.APIUrl}edit/`, data)
  }

  deleteReadList(url : any) {
    return this.http.delete(`${this.APIUrl}delete/${url}/`)
  }
}
