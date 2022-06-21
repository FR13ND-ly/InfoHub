import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesService } from '../shared/data-access/articles.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent {

  constructor(private articlesService : ArticlesService) { }
  
  articles$ : Observable<any> = this.articlesService.getDrafts()

}
