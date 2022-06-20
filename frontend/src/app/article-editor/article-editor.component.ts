import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, Observable, switchMap } from 'rxjs';
import { ArticlesService } from '../shared/data-access/articles.service';
import { LoadingService } from '../shared/data-access/loading.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private articleService : ArticlesService,  private loadingService : LoadingService) { }
  
  article$ : Observable<any> = this.route.paramMap.pipe(
    delay(500),
    switchMap((params : Params)  => this.articleService.getArticleToEdit(params['params'].url)
    )
  )

  ngOnInit(): void {
    this.loadingService.setLoading(true)
    this.article$.subscribe(() => this.loadingService.setLoading(false))
  }

  onPublish(article : any) {
    this.loadingService.setLoading(true)
    this.articleService.editArticle(article).subscribe(
      () => this.loadingService.setLoading(false)
    )
  }
}
