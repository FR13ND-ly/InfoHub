import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'files/'

  getFiles(index : number) {
    return this.http.get(`${this.APIUrl}${index}/`)
  }

  addFile(file : any) {
    return this.http.post(`${this.APIUrl}add/`, file)
  }
}
