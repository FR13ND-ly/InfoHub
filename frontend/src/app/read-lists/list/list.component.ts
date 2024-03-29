import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatestWith,
  delay,
  filter,
  Observable,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { ArticleAction } from 'src/app/core/models/article/article-action.model';
import { ArticlesResponse } from 'src/app/core/models/article/article.response.model';
import { ListInfo } from 'src/app/core/models/readlist.info.model';
import { UserService } from 'src/app/core/data-access/user.service';
import { setLoading } from 'src/app/state/loading/loading.actions';
import { ReadListsService } from '../read-lists.service';
import { User } from 'src/app/core/models/user.model';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private readListService: ReadListsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store<{ loading: boolean }>,
    private dialog: MatDialog
  ) {}

  id!: number | string;
  user!: User;
  index: number = 1;
  icons: Array<string> = [
    'bookmark',
    'home',
    'search',
    'favorite',
    'add',
    'delete',
    'star',
    'bolt',
    'block',
    'info',
    'schedule',
    'language',
    'task_alt',
    'event',
    'event_note',
    'priority_high',
    'all_inclusive',
    'notification_important',
    'collections_bookmark',
    'push_pin',
    'new_label',
    'eco',
  ];

  listInfo$: Observable<any> = this.userService.getUserUpdateListener().pipe(
    delay(500),
    filter((user: User) => !!user),
    switchMap((user) =>
      this.readListService.getReadListInfo({
        id:
          this.route.snapshot.paramMap.get('url') == 'istoric'
            ? -1
            : this.route.snapshot.paramMap.get('url') == 'aprecieri'
            ? -2
            : this.route.snapshot.paramMap.get('url'),
        user: user['uid'],
      })
    ),
    catchError(async (err) => { 
      this.store.dispatch(setLoading({state : false}))
      this.router.navigate(['/404'])
    })
  );

  articles$: Observable<ArticlesResponse> = this.userService.getUserUpdateListener().pipe(
    delay(500),
    filter((user: any) => user),
    tap((user) => (this.user = user)),
    switchMap((user) : Observable<ArticlesResponse> =>
      this.readListService.getReadListArticles({
        id:
          this.route.snapshot.paramMap.get('url') == 'istoric'
            ? -1
            : this.route.snapshot.paramMap.get('url') == 'aprecieri'
            ? -2
            : this.route.snapshot.paramMap.get('url'),
        user: user.uid,
      })
    )
  );

  ngOnInit(): void {
    this.store.dispatch(setLoading({state : true}))
    this.id = <string>this.route.snapshot.paramMap.get('url');
    this.articles$
      .pipe(delay(500), combineLatestWith(this.listInfo$))
      .subscribe(() => this.store.dispatch(setLoading({state : false})));
  }

  onChangeName(listInfo: ListInfo, newName: string) {
    let newListInfo: any = { ...listInfo };
    newListInfo.name = newName;
    this.onEdit(newListInfo);
  }

  onChangeAccess(listInfo: ListInfo) {
    listInfo.public = !listInfo.public;
    this.onEdit(listInfo);
  }

  onCopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  onDelete() {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent);
    confirmDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.readListService.deleteReadList(this.id).subscribe(() => {
          this.router.navigate(['/readlist'])
        })
      }
    })
  }

  onChangeIcon(listInfo: ListInfo, icon: string): void {
    listInfo.icon = icon;
    this.onEdit(listInfo);
  }

  onEdit(listInfo: ListInfo) {
    this.readListService.editReadList(listInfo, this.id).subscribe();
  }

  onLoadMoreArticles(articles: ArticlesResponse) {
    if (articles.noMoreArticles) return;
    this.store.dispatch(setLoading({state : true}))
    this.readListService
      .getReadListArticles({
        id: this.id == 'istoric' ? -1 : this.id == 'aprecieri' ? -2 : this.id,
        user: this.user['uid'],
        index: ++this.index,
      })
      .subscribe((res: any) => {
        this.store.dispatch(setLoading({state : false}))
        articles.articles.push(...res.articles);
        articles.noMoreArticles = res.noMoreArticles;
      });
  }

  onRemoveItem(event : ArticleAction) {
    event.el.classList.add('delete')
    this.readListService.removeItem({
      article : event.article,
      list : this.route.snapshot.paramMap.get('url')
    }).subscribe()
    timer(600).subscribe(() => event.el.remove())
  }
}
