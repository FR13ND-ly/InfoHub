import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/shared/data-access/user.service';
import { setUserSidenavState } from 'src/app/state/user-sidenav-open/user-sidenav-open.actions';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss'],
})
export class UserSidenavComponent implements OnInit {
  constructor(
    private userService: UserService,
    private store: Store<any>
  ) {}

  user!: any;

  ngOnInit(): void {
    this.userService
      .getUserUpdateListener()
      .subscribe((user: any) => (this.user = user));
  }

  onCloseUserSideNav() {
    this.store.dispatch(setUserSidenavState({state : false}))
  }
}
