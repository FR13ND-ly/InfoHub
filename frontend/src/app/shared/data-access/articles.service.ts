import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'articles/'

  getArticleToEdit(url: string) {
    return this.http.get(`${this.APIUrl}get-article-to-edit/${url}/`)
  }

  onAddArticle(article : any) {
    return this.http.post(`${this.APIUrl}add/`, article)
  }

  getSlider() : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.APIUrl}slider/`)
  }

  getRightSide() : Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.APIUrl}right-side/`)
  }

  getArticles(index : number) {
    return this.http.get(`${this.APIUrl}all/${index}/`)
  }

  getArticle(url : string) : Observable<any> {
    return this.http.get(`${this.APIUrl}${url}/`)
  }

  getDrafts() {
    return this.http.get(`${this.APIUrl}drafts/`)
  }

  editArticle(article : any) {
    return this.http.put(`${this.APIUrl}edit/`, article)
  }

  getArticlesByCategory(tag : string) {
    return this.http.get(`${this.APIUrl}category-articles/${tag}/`)
  }
}
