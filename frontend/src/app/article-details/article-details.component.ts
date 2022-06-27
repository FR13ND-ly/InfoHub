import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, filter, interval, Observable, skipWhile, switchMap, takeWhile, throttle } from 'rxjs';
import { ArticlesService } from '../shared/data-access/articles.service';
import { addArticle, resetArticles, setArticle } from '../state/articles/articles.actions';
import { setSearchSidenavOpen } from '../state/search-sidenav/search-sidenav.actions';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private route : ActivatedRoute, private store : Store<any>, private scrollDispatcher: ScrollDispatcher, private articlesService : ArticlesService, private metaService : Meta, private titleService : Title) { }

  articles$ : Observable<string[]> = this.store.select('articles')
  loadArticles : boolean = true
  articles!: any

  @ViewChildren('articles') articlesRef! : QueryList<ElementRef>

  noMoreArticles : boolean = false
  
  observer = new IntersectionObserver((articles) => {this.observeArticles(articles) , 1});

  ngOnInit(): void {
    this.route.params.subscribe((params : any) => {
      this.store.dispatch(setArticle({ url : params.url }))
      this.store.dispatch(setSearchSidenavOpen({state: false}))
    })
    this.articles$.subscribe((articles) => this.articles = articles)
  }

  ngAfterViewInit(): void {
    this.articlesRef.toArray().forEach((article : any) => {
      this.observer.observe(article.nativeElement)
    })
    this.articlesRef.changes.subscribe((articles) => {
      articles._results.forEach((article: any) => {
        this.observer.observe(article.nativeElement)
      });
      this.loadArticles = true
    })
    this.scrollDispatcher.scrolled().pipe(
      delay(500),
      filter((cdk : any) => {
        let element = cdk.getElementRef().nativeElement
        return element.offsetHeight + element.scrollTop >= element.scrollHeight - 400 && this.loadArticles
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
      this.store.dispatch(addArticle({ url : data.article }))
    })
  }

  observeArticles(articles : any) {
    articles.forEach((articleRef : IntersectionObserverEntry, i : number) => {
      if (articleRef.isIntersecting){
        this.setTitle(articleRef.target.id)
      }
    })
  }

 
  setTitle(title: string) {
    this.titleService.setTitle(
      title.replace(/-/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, (letter: any) =>
        letter.toUpperCase()
      ) + ' |  InfoHub'
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetArticles())
    this.observer.disconnect()
  }

}
