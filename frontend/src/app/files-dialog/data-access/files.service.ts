import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesResponse } from 'src/app/core/models/files.response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'files/'

  getFiles(index : number) : Observable<FilesResponse> {
    return <Observable<FilesResponse>>this.http.get(`${this.APIUrl}${index}/`)
  }

  addFile(file : any) {
    return this.http.post(`${this.APIUrl}add/`, file)
  }
}
