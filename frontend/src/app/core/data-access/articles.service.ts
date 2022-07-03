import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleEdit } from 'src/app/core/models/article.edit.model';
import { ArticleLightPreview } from 'src/app/core/models/article.light-preview.model';
import { Article } from 'src/app/core/models/article.model';
import { ArticlePreview } from 'src/app/core/models/article.preview.model';
import { ArticlesResponse } from 'src/app/core/models/article.response.model';
import { Survey } from 'src/app/core/models/survey.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  readonly APIUrl = environment.apiUrl + 'articles/'

  getArticleToEdit(url: string) {
    return <Observable<ArticleEdit>>this.http.get(`${this.APIUrl}get-article-to-edit/${url}/`)
  }

  onAddArticle(article : any) {
    return this.http.post(`${this.APIUrl}add/`, article)
  }

  getSlider() {
    return <Observable<ArticlePreview[]>>this.http.get(`${this.APIUrl}slider/`)
  }

  getRightSide() {
    return <Observable<ArticlePreview[]>>this.http.get(`${this.APIUrl}right-side/`)
  }

  getArticles(index : number) : Observable<ArticlesResponse> {
    return <Observable<ArticlesResponse>>this.http.get(`${this.APIUrl}all/${index}/`)
  }

  getArticle(url : string) : Observable<Article> {
    return <Observable<Article>>this.http.get(`${this.APIUrl}${url}/`)
  }

  getDrafts() {
    return <Observable<ArticlePreview[]>>this.http.get(`${this.APIUrl}drafts/`)
  }

  editArticle(article : any) {
    return this.http.put(`${this.APIUrl}edit/`, article)
  }

  getArticlesByCategory(tag : string) {
    return <Observable<ArticlePreview[]>>this.http.get(`${this.APIUrl}category-articles/${tag}/`)
  }

  getSurvey(data : any) {
    return <Observable<Survey[]>>this.http.post(`${this.APIUrl}survey/`, data)
  }

  vote(data : any) {
    return this.http.post(`${this.APIUrl}vote/`, data)
  }

  getAditionalArticles(url : string) {
    return <Observable<ArticleLightPreview[]>>this.http.get(`${this.APIUrl}aditional-articles/${url}/`)
  }

  deleteArticle(url : string) {
    return this.http.delete(`${this.APIUrl}delete/${url}/`)
  }

  getNextArticle(data : any) {
    return this.http.post(`${this.APIUrl}next-article/`, data)
  }
}
