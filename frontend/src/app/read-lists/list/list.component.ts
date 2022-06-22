import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  catchError,
  combineLatestWith,
  delay,
  filter,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user.service';
import { setLoading } from 'src/app/state/loading/loading.actions';
import { ReadListsService } from '../read-lists.service';

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
    private store: Store<{ loading: boolean }>
  ) {}

  id!: any;
  user!: any;
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
    filter((user: any) => user),
    switchMap((user) =>
      this.readListService.getReadListInfo({
        id:
          this.route.snapshot.paramMap.get('url') == 'istoric'
            ? -1
            : this.route.snapshot.paramMap.get('url') == 'aprecieri'
            ? -2
            : this.route.snapshot.paramMap.get('url'),
        user: user.uid,
      }).pipe(
        catchError(async (err) => { 
          this.store.dispatch(setLoading({state : false}))
          this.router.navigate(['/404'])
        }),
      )
    )
  );

  articles$: Observable<any> = this.userService.getUserUpdateListener().pipe(
    delay(500),
    filter((user: any) => user),
    map((user) => (this.user = user)),
    switchMap((user) =>
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
    this.id = this.route.snapshot.paramMap.get('url');
    this.articles$
      .pipe(delay(500), combineLatestWith(this.listInfo$))
      .subscribe(() => this.store.dispatch(setLoading({state : false})));
  }

  onChangeName(listInfo: any, newName: string) {
    let newListInfo: any = { ...listInfo };
    newListInfo.name = newName;
    this.onEdit(newListInfo);
  }

  onChangeAccess(listInfo: any) {
    listInfo.public = !listInfo.public;
    this.onEdit(listInfo);
  }

  onCopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  onDelete() {
    if (!confirm('Ești sigur?')) return
    this.readListService.deleteReadList(this.id).subscribe(() => {
      this.router.navigate(['/readlist'])
    })
  }

  onChangeIcon(listInfo: any, icon: string): void {
    listInfo.icon = icon;
    this.onEdit(listInfo);
  }

  onEdit(listInfo: any) {
    this.readListService.editReadList(listInfo, this.id).subscribe();
  }

  onLoadMoreArticles(articles: any) {
    if (articles.noMoreArticles) return;
    this.store.dispatch(setLoading({state : true}))
    this.readListService
      .getReadListArticles({
        id: this.id == 'istoric' ? -1 : this.id == 'aprecieri' ? -2 : this.id,
        user: this.user.uid,
        index: ++this.index,
      })
      .subscribe((res: any) => {
        this.store.dispatch(setLoading({state : false}))
        articles.articles.push(...res.articles);
        articles.noMoreArticles = res.noMoreArticles;
      });
  }
}
