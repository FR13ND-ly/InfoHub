import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
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
    switchMap((params : any)  => this.articleService.getArticleToEdit(params.params.url)
    )
  )

  ngOnInit(): void {
    this.loadingService.setLoading(true)
    this.article$.subscribe(() => this.loadingService.setLoading(false))
  }

  onPublish(article : any) {
    this.loadingService.setLoading(true)
    console.log(article.text)
    this.articleService.editArticle(article).subscribe(
      () => this.loadingService.setLoading(false)
    )
  }
}
