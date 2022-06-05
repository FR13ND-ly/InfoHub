import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ArticlesService } from '../shared/data-access/articles.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent {

  constructor(private route: ActivatedRoute, private articleService : ArticlesService) { }
  
  article$ : Observable<any> = this.route.paramMap.pipe(
    switchMap((params : any)  => this.articleService.getArticleToEdit(params.params.url)
    )
  )

  onPublish(article : any) {
    this.articleService.editArticle(article).subscribe()
  }
}
