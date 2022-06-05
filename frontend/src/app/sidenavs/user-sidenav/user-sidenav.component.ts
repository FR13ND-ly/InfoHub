import { Component, OnInit } from '@angular/core';
import { UserSidenavOpenService } from 'src/app/shared/data-access/user-sidenav-open.service';
import { UserService } from 'src/app/shared/data-access/user.service';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss']
})
export class UserSidenavComponent implements OnInit {

  constructor(private userSideNavOpenService : UserSidenavOpenService, private userService : UserService) { }

  user! : any

  ngOnInit(): void {
    this.userService.getUserUpdateListener().subscribe((user : any) => this.user = user)
  }

  onCloseUserSideNav() {
    this.userSideNavOpenService.changeOpenUserNav(false)
  }

}
