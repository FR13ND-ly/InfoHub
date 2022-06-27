import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { buffer, debounce, debounceTime, filter, map, Observable, skipUntil, tap } from 'rxjs';
import { addArticle, resetArticles, setArticle } from '../state/articles/articles.actions';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private route : ActivatedRoute, private store : Store<any>, private scrollDispatcher: ScrollDispatcher,) { }

  articles$ : Observable<string[]> = this.store.select('articles')

  ngOnInit(): void {
    this.route.params.subscribe((params : any) => {
      this.store.dispatch(setArticle({ url : params.url }))
    })
  }

  ngAfterViewInit(): void {
    this.scrollDispatcher.scrolled().pipe(
      debounceTime(500),
      filter((cdk : any) => {
        let element = cdk.getElementRef().nativeElement
        return element.offsetHeight + element.scrollTop >= element.scrollHeight - 700
      })
    )
    .subscribe((cdk : any) => {
      this.store.dispatch(addArticle({ url : "Non-enim-praesent-elementum-facilisis" }))
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetArticles())
  }
}
