import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { delay, filter, Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user.service';
import { setLoading } from 'src/app/state/loading/loading.actions';
import { ReadListsService } from '../read-lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  constructor(
    private readListsService: ReadListsService,
    private userService: UserService,
    private store: Store<{ loading: boolean }>
  ) {}

  lists$: Observable<any> = this.userService.getUserUpdateListener().pipe(
    delay(500),
    filter((user: any) => user),
    switchMap((user: any) => this.readListsService.getReadLists(user.uid))
  );

  ngOnInit(): void {
    this.store.dispatch(setLoading({state : true}))
    this.lists$.subscribe(() => this.store.dispatch(setLoading({state : false})));
  }
}
