import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements AfterViewInit {

  @Input() 
  articles : any 

  @Input()
  left!: boolean

  @Input()
  hideDetails : boolean = false

  @Output() onBottom = new EventEmitter()

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

  observeArticles(articles : any) {
    articles.forEach((article : IntersectionObserverEntry) => {
      if (article.isIntersecting){
        if (article.target == this.articlesRef.last.nativeElement) {
          this.onBottom.emit()
        }
        article.target.classList.add("show")
        this.observer.unobserve(article.target)
      }
    })
  }
}
