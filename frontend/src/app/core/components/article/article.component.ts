import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ArticlePreview } from 'src/app/core/models/article/article.preview.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements AfterViewInit {

  @Input() 
  articles! : ArticlePreview[] | null

  @Input()
  left!: boolean

  @Input()
  icon!: string

  @Input()
  backdropColorWarn: boolean = false

  @Output() onScrollToEnd = new EventEmitter()

  @Output() onAction = new EventEmitter()

  @ViewChildren('articleRef') articlesRef!: QueryList<ElementRef>;

  observer = new IntersectionObserver((articles) => {this.observeArticles(articles)});
  constructor() { }

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

  observeArticles(articles : IntersectionObserverEntry[]) {
    articles.forEach((article : IntersectionObserverEntry) => {
      if (article.isIntersecting){
        if (article.target == this.articlesRef.last.nativeElement) {
          this.onScrollToEnd.emit()
        }
        article.target.classList.add("show")
        this.observer.unobserve(article.target)
      }
    })
  }

  onActionExec(article : ArticlePreview, articleRef : HTMLElement) {
    article.opened = false
    this.onAction.emit({ article : article.url, el : articleRef})
  }

  trackByFn(index : number, article : ArticlePreview) : string {
    return article.url
  }
}
