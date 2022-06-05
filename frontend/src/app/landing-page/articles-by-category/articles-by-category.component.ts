import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';

@Component({
  selector: 'app-articles-by-category',
  templateUrl: './articles-by-category.component.html',
  styleUrls: ['./articles-by-category.component.scss']
})
export class ArticlesByCategoryComponent implements AfterViewInit {

  constructor(private articlesService : ArticlesService) { }

  @ViewChild('articlesWrapper') articlesWrapper! : ElementRef

  selected : string = 'economic'

  articles$ : Observable<any> = this.articlesService.getArticlesByCategory(this.selected)

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((articles) => {
      articles.forEach((article : IntersectionObserverEntry) => {
        if (article.isIntersecting) {
          article.target.classList.add('show')
          observer.unobserve(article.target)
        }
      })
    }, {threshold : .3})
    if (this.articlesWrapper) {
      observer.observe(this.articlesWrapper.nativeElement)
    }
  }

  onSelectCategory(category : string) {
    this.selected = category
  }
}
