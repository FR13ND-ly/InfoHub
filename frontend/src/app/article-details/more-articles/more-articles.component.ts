import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, timer } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';
import { setArticle } from 'src/app/state/articles/articles.actions';

@Component({
  selector: 'app-more-articles',
  templateUrl: './more-articles.component.html',
  styleUrls: ['./more-articles.component.scss']
})
export class MoreArticlesComponent implements AfterViewInit {

  constructor(private route: ActivatedRoute, private articlesService: ArticlesService, private router: Router, private store: Store) { }

  @ViewChild('articlesRef') articlesRef!: ElementRef
  @Input() url!: string

  articles$: Observable<any> = this.route.params.pipe(
    switchMap((params: any) => this.articlesService.getAditionalArticles(params.url))
  )

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((surveyEntry: IntersectionObserverEntry) => {
        if (surveyEntry.isIntersecting) {
          surveyEntry.target.classList.add('show')
          observer.unobserve(surveyEntry.target)
        }
      })
    }, { threshold: .2 })
    observer.observe(this.articlesRef.nativeElement)
  }

  onGoToArticle(url: any) {
    timer(0).subscribe(() => {
      this.store.dispatch(setArticle({ url }))
      document.querySelector('mat-sidenav-content')?.scrollTo({ top: 0 })
    })
  }

}
