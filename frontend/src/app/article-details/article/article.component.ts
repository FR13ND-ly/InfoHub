import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, delay, filter, first, Observable, Subscription, switchMap, tap, timer } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';
import { setLoading } from 'src/app/state/loading/loading.actions';
import { setReadProgress } from 'src/app/state/read-progress/read-progress.actions';

@Component({
  selector: 'article-details-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  constructor(
    private router : Router,
    private articlesService: ArticlesService,
    private titleService: Title,
    private metaService: Meta,
    private scrollDispatcher: ScrollDispatcher,
    private store: Store<any>
  ) {}

  @Input() url! : string
  
  article$: Observable<any> = timer(0).pipe( 
    switchMap(() : Observable<any> => {
      return this.articlesService.getArticle(this.url).pipe(
        delay(500),
        catchError(async (err) => {
          this.router.navigate(['/404']);
          this.store.dispatch(setLoading({ state: false }));
        })
      );
    })
  )
  scrollDispatcherSub!: Subscription

  ngOnInit(): void {
    this.store.dispatch(setLoading({state : true}))
    this.article$.subscribe((article: any) => {
      this.setMeta(article);
      this.store.dispatch(setLoading({state : false}))
      let articleSize = (<HTMLElement>document.querySelector('article-details-article'))?.offsetHeight
      if (articleSize > 1000) {
        timer(0).subscribe(() => {
          this.scrollDispatcherSub = this.scrollDispatcher.scrolled().pipe(
            filter((cdk : any) => !cdk.dir)
          )
          .subscribe((cdk: any) => {
            let scrollTop = cdk.getElementRef().nativeElement.scrollTop;
            this.store.dispatch(setReadProgress(
              {state : scrollTop / articleSize * 100}))
          });
        })
      }
    });
    
  }

  setMeta(article: any) {
    this.titleService.setTitle(
      article?.title.replace(/(^\w{1})|(\s+\w{1})/g, (letter: any) =>
        letter.toUpperCase()
      ) + ' |  InfoHub'
    );
    let description = article.text.replace(/<[^>]+>/gm, '');
    description =
      description.split(' ').length < 25
        ? description.split(' ').slice(0, 25).join(' ')
        : description.split(' ').slice(0, 25).join(' ') + '...';
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      property: 'oc:description',
      content: description,
    });
    this.metaService.addTag({
      name: 'article:published_time',
      content: article.date,
    });
    this.metaService.addTag({
      property: 'oc:image',
      content: article.imageUrl,
    });
    this.metaService.addTag({
      name: 'twitter:description',
      content: 'description',
    });
    this.metaService.addTag({
      name: 'twitter:image',
      content: article.imageUrl,
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(setReadProgress({state : 0}))
    this.titleService.setTitle('InfoHub')
    this.scrollDispatcherSub?.unsubscribe()
  }
}
