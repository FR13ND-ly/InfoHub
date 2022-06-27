import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, scan, switchMap, takeWhile } from 'rxjs';
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
  
  articles$ : Observable<any> = this.index$.pipe(
    takeWhile((res : any) => !res.noMoreArticles),
    switchMap((index) => this.articleService.getArticles(index)),
    scan((acc :any, res:any) => [...acc, ...res.articles], []),
  )

  ngOnInit(): void {
    this.userService.getUserUpdateListener().subscribe((res) => this.user = res)
  }

  loadMoreArticles() {
    this.index$.next(this.index$.value + 1)
  }

  onReadLater(article : any) {
    this.readListsService.readLater({
      article,
      user : this.user.uid
    }).subscribe()
  }
}
