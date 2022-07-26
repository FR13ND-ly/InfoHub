import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from './core/data-access/user.service';
import { setUserSidenavState } from './state/user-sidenav-open/user-sidenav-open.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private store: Store<any>
  ) {}

  searchSideNav$: Observable<any> = this.store.select('searchSidenav')
  userSideNavOpen$: Observable<boolean> = this.store.select('userSidenavOpen')

  ngOnInit(): void {
    this.userService.initiliaze();
  }

  onDeactivate() {
    document.querySelector('mat-sidenav-content')!.scrollTo(0, 0);
  }

  onCloseUserSidenav() {
    this.store.dispatch(setUserSidenavState({ state : false }))
  }
}
