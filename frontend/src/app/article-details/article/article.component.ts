import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay, filter, first, Observable, Subscription, switchMap, timer } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';
import { LoadingService } from 'src/app/shared/data-access/loading.service';
import { ReadProgressService } from 'src/app/shared/data-access/read-progress.service';

@Component({
  selector: 'article-details-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private titleService: Title,
    private metaService: Meta,
    private loadingService: LoadingService,
    private readProgress : ReadProgressService,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  article$: Observable<any> = this.route.paramMap.pipe(
    delay(500),
    switchMap((params: any) =>
      this.articlesService.getArticle(params.params.url).pipe(
        catchError(async (err) => {
          this.router.navigate(['/404'])
          this.loadingService.setLoading(false);
        })
      )
    ),
  );
  scrollDispatcherSub!: Subscription

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.article$.subscribe((article: any) => {
      this.setMeta(article);
      this.loadingService.setLoading(false);
      let articleSize = (<HTMLElement>document.querySelector('article-details-article'))?.offsetHeight
      if (articleSize > 1000) {
        timer(0).subscribe(() => {
          this.scrollDispatcherSub = this.scrollDispatcher.scrolled().pipe(
            filter((cdk : any) => !cdk.dir)
          )
          .subscribe((cdk: any) => {
            let scrollTop = cdk.getElementRef().nativeElement.scrollTop;
            this.readProgress.setProgress(
              scrollTop / articleSize * 100 )
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
    this.readProgress.setProgress(0)
    this.titleService.setTitle('InfoHub')
    this.scrollDispatcherSub?.unsubscribe()
  }
}
