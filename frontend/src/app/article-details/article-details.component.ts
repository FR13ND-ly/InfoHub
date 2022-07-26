import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, switchMap, takeWhile} from 'rxjs';
import { ArticlesService } from '../core/data-access/articles.service';
import { addArticle, resetArticles, setArticle } from '../state/articles/articles.actions';
import { setSearchSidenavOpen } from '../state/search-sidenav/search-sidenav.actions';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private route : ActivatedRoute, private store : Store<any>, private scrollDispatcher: ScrollDispatcher, private articlesService : ArticlesService, private metaService : Meta, private titleService : Title, private location: Location) { }

  articles$ : Observable<string[]> = this.store.select('articles')
  loadArticles : boolean = true
  articles!: string[]
  url!: string

  @ViewChildren('articles') articlesRef! : QueryList<ElementRef>

  noMoreArticles : boolean = false
  
  observer = new IntersectionObserver((articles) => {this.observeArticles(articles) , 1});

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
      this.store.dispatch(setArticle({ url : params['url'] }))
      this.store.dispatch(setSearchSidenavOpen({state: false}))
    })
    this.articles$.subscribe((articles) => this.articles = articles)
  }

  ngAfterViewInit(): void {
    this.articlesRef.toArray().forEach((article : ElementRef) => {
      this.observer.observe(article.nativeElement)
    })
    this.articlesRef.changes.subscribe((articles) => {
      articles._results.forEach((article: ElementRef) => {
        this.observer.observe(article.nativeElement)
      });
      this.loadArticles = true
    })
    this.scrollDispatcher.scrolled().pipe(
      filter((cdk : CdkScrollable | void) => {
        let element = cdk!.getElementRef().nativeElement
        return element.offsetHeight + element.scrollTop >= element.scrollHeight - 1000 && this.loadArticles
      }),
      switchMap(() => this.articlesService.getNextArticle(this.articles).pipe(
        takeWhile((res : any) => {
          this.noMoreArticles = res.noMoreArticles
          return !res.noMoreArticles
        })
      ))
    )
    .subscribe((data: any) => {
      this.loadArticles = false
      if (!this.articles.includes(data.article)) this.store.dispatch(addArticle({ url : data.article }))
    })
  }

  observeArticles(articles : IntersectionObserverEntry[]) {
    articles.forEach((articleRef : IntersectionObserverEntry) => {
      if (articleRef.isIntersecting){
        this.setTitle(articleRef.target.id)
        this.url = articleRef.target.id
        this.location.replaceState(`articol/${this.url}`)
      }
    })
  }

 
  setTitle(title: string) {
    this.titleService.setTitle(
      title.replace(/-/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) =>
        letter.toUpperCase()
      ) + ' |  InfoHub'
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetArticles())
    this.observer.disconnect()
  }

}
