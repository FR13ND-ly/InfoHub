import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/core/data-access/user.service';
import { setUserSidenavState } from 'src/app/state/user-sidenav-open/user-sidenav-open.actions';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  constructor(
    private userService: UserService,
    private store: Store<any>
  ) {}

  loading : boolean = false

  user!: any;

  ngOnInit(): void {
    this.userService.getUserUpdateListener().subscribe((user) => {
      this.user = user;
    });
  }

  onCloseUserSideNav() {
    this.store.dispatch(setUserSidenavState({state : false}))
  }

  onLogout() {
    this.userService.logout();
  }

  onChangeTheme() {
    localStorage.setItem(
      'theme',
      !localStorage.getItem('theme') ? 'dark-theme' : ''
    );
    this.onSetTheme();
  }

  onSetTheme() {
    document.body.classList.toggle(
      'dark-theme',
      !!localStorage.getItem('theme')
    );
  }

  onSetUserImage(e: any) {
    this.loading = true
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('file', file, file.name);
    let data = {
      file: formData,
      token: this.user.uid,
    };
    this.userService.setUserImage(data).subscribe(() => this.loading = false);
  }
}
