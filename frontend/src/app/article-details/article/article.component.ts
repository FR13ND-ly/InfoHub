import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay, first, Observable, switchMap, timer } from 'rxjs';
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
      this.articlesService.getArticle(params.params.url)
    )
  );

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.article$.subscribe((article: any) => {
      this.setMeta(article);
      this.loadingService.setLoading(false);
      let articleSize = (<HTMLElement>document.querySelector('article-details-article'))?.offsetHeight
      if (articleSize > 1000) {
        timer(0).subscribe(() => {
          this.scrollDispatcher.scrolled().subscribe((cdk: any) => {
            let scrollTop = cdk.getElementRef().nativeElement.scrollTop;
            
            this.readProgress.setProgress(
              (scrollTop / (articleSize - articleSize / 4)) * 100)
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
  }
}
