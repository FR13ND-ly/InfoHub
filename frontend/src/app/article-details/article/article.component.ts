import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Observable, switchMap } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';

@Component({
  selector: 'article-details-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private articlesService : ArticlesService) { }
  
  article$ : Observable<any> = this.route.paramMap.pipe(
    delay(500),
    switchMap((params : any) => this.articlesService.getArticle(params.params.url))
  )

  ngOnInit(): void {
  }

}
