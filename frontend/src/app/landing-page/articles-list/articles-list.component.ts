import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, scan, switchMap, takeWhile } from 'rxjs';
import { ArticleAction } from 'src/app/core/models/article-action.model';
import { ArticlePreview } from 'src/app/core/models/article.preview.model';
import { ArticlesResponse } from 'src/app/core/models/article.response.model';
import { ReadListsService } from 'src/app/read-lists/read-lists.service';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';
import { UserService } from 'src/app/shared/data-access/user.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  constructor(private articleService : ArticlesService, private userService : UserService, private readListsService : ReadListsService) { }

  user! : any
  index$: BehaviorSubject<number> = new BehaviorSubject<number>(1)
  
  articles$ : Observable<ArticlePreview[]> = this.index$.pipe(
    takeWhile((res : any) => !res.noMoreArticles),
    switchMap((index) => this.articleService.getArticles(index)),
    scan((acc : ArticlePreview[], res: ArticlesResponse) => [...acc, ...res.articles], []),
  )

  ngOnInit(): void {
    this.userService.getUserUpdateListener().subscribe((res) => this.user = res)
  }

  loadMoreArticles() : void {
    this.index$.next(this.index$.value + 1)
  }

  onReadLater(article : ArticleAction) : void {
    this.readListsService.readLater({
      article : article.article,
      user : this.user.uid
    }).subscribe()
  }
}
