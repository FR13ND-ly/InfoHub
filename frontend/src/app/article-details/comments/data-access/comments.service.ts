import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'comments/'

  getComments(url : string) {
    return this.http.get(`${this.APIUrl}get/${url}`)
  }

  addComment(data : any) {
    return this.http.post(`${this.APIUrl}add/`, data)
  }

  removeComment(id : number) {
    return this.http.delete(`${this.APIUrl}remove/${id}`)
  }
}
