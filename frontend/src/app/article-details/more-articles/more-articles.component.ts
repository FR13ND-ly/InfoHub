import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, timer } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';

@Component({
  selector: 'app-more-articles',
  templateUrl: './more-articles.component.html',
  styleUrls: ['./more-articles.component.scss']
})
export class MoreArticlesComponent implements AfterViewInit {

  constructor(private route : ActivatedRoute, private articlesService : ArticlesService, private router : Router) { }

  @ViewChild('articlesRef') articlesRef! : ElementRef

  articles$ : Observable<any> =  this.route.params.pipe(
    switchMap((params : any) => this.articlesService.getAditionalArticles(params.url))
  )

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((surveyEntry : IntersectionObserverEntry) => {
        if (surveyEntry.isIntersecting) {
          surveyEntry.target.classList.add('show')
          observer.unobserve(surveyEntry.target)
        }
      })
    }, {threshold : .2})
    observer.observe(this.articlesRef.nativeElement)
  }

  onGoToArticle(url : any) {
    this.router.navigate(['/articol', url]).then(() => {
      document.querySelector('mat-sidenav-content')?.scrollTo({top: 0, behavior: 'smooth'})
    })
  }

}
