import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { delay, filter, Observable, switchMap } from 'rxjs';
import { ReadList } from 'src/app/core/models/readlist.model';
import { UserService } from 'src/app/core/data-access/user.service';
import { setLoading } from 'src/app/state/loading/loading.actions';
import { AddReadlistDialogComponent } from '../add-readlist-dialog/add-readlist-dialog.component';
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
    private store: Store<{ loading: boolean }>,
    public dialog: MatDialog
  ) {}

  lists$: Observable<ReadList[]> = this.userService.getUserUpdateListener().pipe(
    delay(500),
    filter((user: any) => user),
    switchMap((user: any) => this.readListsService.getReadLists(user.uid))
  );

  ngOnInit(): void {
    this.store.dispatch(setLoading({state : true}))
    this.lists$.subscribe(() => this.store.dispatch(setLoading({state : false})));
  }

  onAddReadList() {
    let dialog = this.dialog.open(AddReadlistDialogComponent);
    dialog.afterClosed().subscribe(() => this.lists$ = this.userService.getUserUpdateListener().pipe(
      delay(500),
      filter((user: any) => user),
      switchMap((user: any) => this.readListsService.getReadLists(user.uid))
    ))
  }
}
