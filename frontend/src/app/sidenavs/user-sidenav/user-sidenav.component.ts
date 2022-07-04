import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/data-access/user.service';
import { User } from 'src/app/core/models/user.model';
import { setUserSidenavState } from 'src/app/state/user-sidenav-open/user-sidenav-open.actions';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss'],
})
export class UserSidenavComponent {
  constructor(
    private userService: UserService,
    private store: Store
  ) {}
  
  user$ : Observable<User> = this.userService.getUserUpdateListener()

  onCloseUserSideNav() {
    this.store.dispatch(setUserSidenavState({state : false}))
  }
}
