import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, interval, Observable, skipWhile, switchMap, takeWhile, throttle } from 'rxjs';
import { ArticlesService } from '../shared/data-access/articles.service';
import { addArticle, resetArticles, setArticle } from '../state/articles/articles.actions';
import { setSearchSidenavOpen } from '../state/search-sidenav/search-sidenav.actions';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private route : ActivatedRoute, private store : Store<any>, private scrollDispatcher: ScrollDispatcher, private articlesService : ArticlesService) { }

  articles$ : Observable<string[]> = this.store.select('articles')
  articles! : any

  @ViewChildren('articles') articlesRef! : QueryList<ElementRef>

  noMoreArticles : boolean = true
  

  ngOnInit(): void {
    this.route.params.subscribe((params : any) => {
      this.store.dispatch(setArticle({ url : params.url }))
      this.store.dispatch(setSearchSidenavOpen({state: false}))
    })
    this.articles$.subscribe((articles) => this.articles = articles)
  }

  ngAfterViewInit(): void {
    this.scrollDispatcher.scrolled().pipe(
      filter((cdk : any) => {
        let element = cdk.getElementRef().nativeElement
        return element.offsetHeight + element.scrollTop >= element.scrollHeight - 700
      }),
      switchMap(() => this.articlesService.getNextArticle(this.articles).pipe(
        takeWhile((res : any) => {
          this.noMoreArticles = res.noMoreArticles
          return !res.noMoreArticles
        })
      ))
    )
    .subscribe((data: any) => {
      this.store.dispatch(addArticle({ url : data.article }))
    })
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetArticles())
  }
}
