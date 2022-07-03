import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../core/models/article.model';
import { ArticlePreview } from '../core/models/article.preview.model';
import { ArticlesService } from '../shared/data-access/articles.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent {

  constructor(private articlesService : ArticlesService) { }
  
  articles$ : Observable<ArticlePreview[]> = this.articlesService.getDrafts()

}
