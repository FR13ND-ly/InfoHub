import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePreview } from 'src/app/core/models/article/article.preview.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'articles/search/'

  search(text : string) {
    return <Observable<ArticlePreview[]>>this.http.post(this.APIUrl, {text})
  }
}
