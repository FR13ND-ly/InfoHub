import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, Subject, switchMap, timer } from 'rxjs';
import { ArticlePreview } from 'src/app/core/models/article.preview.model';
import { ArticlesService } from 'src/app/core/data-access/articles.service';

@Component({
  selector: 'app-articles-by-category',
  templateUrl: './articles-by-category.component.html',
  styleUrls: ['./articles-by-category.component.scss']
})
export class ArticlesByCategoryComponent implements AfterViewInit {

  constructor(private elRef : ElementRef, private articlesService : ArticlesService) { }

  @ViewChild('articlesWrapper') articlesWrapper! : ElementRef

  selectedCategory$ : BehaviorSubject<string> = new BehaviorSubject<string>('economic')

  articles$ : Observable<ArticlePreview[]> = this.selectedCategory$.pipe(
    switchMap((category) => this.articlesService.getArticlesByCategory(category))
  ) 

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
    if (category == this.selectedCategory$.value) return
    this.selectedCategory$.next(category)
    document.querySelector('app-articles-by-category .articles')?.classList.remove('show')
    timer(0).subscribe(() => document.querySelector('app-articles-by-category .articles')?.classList.add('show'))
  }
}
