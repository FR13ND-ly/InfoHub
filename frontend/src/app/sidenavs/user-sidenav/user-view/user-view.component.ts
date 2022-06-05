import { Component, OnInit } from '@angular/core';
import { UserSidenavOpenService } from 'src/app/shared/data-access/user-sidenav-open.service';
import { UserService } from 'src/app/shared/data-access/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  constructor(private userSideNavOpenService : UserSidenavOpenService, private userService : UserService) { }

  user! : any

  ngOnInit(): void {
    this.userService.getUserUpdateListener().subscribe((user) => {
      this.user = user
    })
  }

  onCloseUserSideNav() {
    this.userSideNavOpenService.changeOpenUserNav(false)
  }

  onLogout() {
    this.userService.logout()
  } 

  onChangeTheme() {
    localStorage.setItem('theme', 
      !localStorage.getItem('theme') ? 'dark-theme' : ''
    )
    this.onSetTheme()
  }

  onSetTheme() {
    document.body.classList.toggle('dark-theme', !!localStorage.getItem('theme'))
  }

  onSetUserImage(e : any) {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('file', file, file.name)
    let data = {
      file : formData,
      token : this.user.uid
    }
    this.userService.setUserImage(data)
  }
}
