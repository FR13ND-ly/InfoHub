import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';

@Component({
  selector: 'app-articles-by-category',
  templateUrl: './articles-by-category.component.html',
  styleUrls: ['./articles-by-category.component.scss']
})
export class ArticlesByCategoryComponent implements AfterViewInit {

  constructor(private elRef : ElementRef, private articlesService : ArticlesService) { }

  @ViewChild('articlesWrapper') articlesWrapper! : ElementRef

  selected : string = 'economic'

  articles$ : Observable<any> = this.articlesService.getArticlesByCategory(this.selected)

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((articles) => {
      articles.forEach((article : IntersectionObserverEntry) => {
        if (article.isIntersecting) {
          document.querySelector('app-articles-by-category .articles')?.classList.add('show')
          observer.unobserve(article.target)
        }
      })
    }, {threshold : .3})
    observer.observe(this.elRef.nativeElement)
  }

  onSelectCategory(category : string) {
    this.selected = category
    document.querySelector('app-articles-by-category .articles')?.classList.remove('show')
    timer(0).subscribe(() => document.querySelector('app-articles-by-category .articles')?.classList.add('show'))
  }
}
