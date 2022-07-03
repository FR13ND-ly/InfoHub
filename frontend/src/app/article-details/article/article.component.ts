import { Component, Input, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, delay, Observable, switchMap, tap, timer } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ArticlesService } from 'src/app/core/data-access/articles.service';
import { setLoading } from 'src/app/state/loading/loading.actions';

@Component({
  selector: 'article-details-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnDestroy {
  constructor(
    private router : Router,
    private articlesService: ArticlesService,
    private titleService: Title,
    private metaService: Meta,
    private store: Store<any>
  ) {
    this.store.dispatch(setLoading({state : true}))
  }

  @Input() article!: string
  @Input() url! : string
  
  article$: Observable<Article> = timer(0).pipe( 
    switchMap(() : Observable<any> => this.articlesService.getArticle(this.article).pipe(
        delay(500),
        tap((article: Article) => {
          this.setMeta(article);
          this.store.dispatch(setLoading({state : false}))
        }),
        catchError(async (err) => {
          this.router.navigate(['/404']);
          this.store.dispatch(setLoading({ state: false }));
        })
      )
    )
  )

  setMeta(article: Article) : void {
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
      content: article.details.date!,
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
    this.titleService.setTitle('InfoHub')
  }
}
