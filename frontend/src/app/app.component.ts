import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { SearchSidenavOpenService } from './shared/data-access/search-sidenav-open.service';
import { UserSidenavOpenService } from './shared/data-access/user-sidenav-open.service';
import { UserService } from './shared/data-access/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private searchSideNavOpenService : SearchSidenavOpenService,  private userSideNavOpenService : UserSidenavOpenService, private userService : UserService) {}

  searchSideNavOpen$ : Observable<boolean> = this.searchSideNavOpenService.getOpenUpdateListener()
  userSideNavOpen$ : Observable<boolean> = this.userSideNavOpenService.getOpenUpdateListener()

  ngOnInit(): void {
    this.userService.initiliaze()
  }

  onDeactivate() {
    document.querySelector('mat-sidenav-content')!.scrollTo(0, 0)
  }

  onCloseUserSidenav() {
    this.userSideNavOpenService.changeOpenUserNav(false)
  }
}
