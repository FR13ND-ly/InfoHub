import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { combineLatestWith, delay, Observable } from 'rxjs';
import { ArticlesService } from 'src/app/core/data-access/articles.service';
import { WidgetsService } from 'src/app/widgets/data-access/widgets.service';

@Component({
  selector: 'app-secondary-articles',
  templateUrl: './secondary-articles.component.html',
  styleUrls: ['./secondary-articles.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class SecondaryArticlesComponent implements AfterViewInit {

  constructor(private elRef : ElementRef, private articlesService : ArticlesService, private widgetsService : WidgetsService) { }

  articles$ : Observable<any> = this.articlesService.getRightSide().pipe(
    delay(500),
    combineLatestWith(this.widgetsService.getWidget(1))
  )
  
  observer = new IntersectionObserver((articles) => {this.observeArticles(articles)});

  @ViewChildren('articleRef') articlesRef!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.articlesRef.toArray().forEach((article : any) => {
      this.observer.observe(article.nativeElement)
    })
    this.articlesRef.changes.subscribe((articles : any) => {
      articles._results.forEach((article: any) => {
        this.observer.observe(article.nativeElement)
      });
    })
}

  observeArticles(articles : any) {
    articles.forEach((article : IntersectionObserverEntry) => {
      if (article.isIntersecting){
        article.target.classList.add("show")
        this.observer.unobserve(article.target)
      }
    })
  }
}
