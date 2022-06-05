import { Component, OnInit } from '@angular/core';
import { SearchSidenavOpenService } from '../shared/data-access/search-sidenav-open.service';
import { UserSidenavOpenService } from '../shared/data-access/user-sidenav-open.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private searchSideNavOpenService : SearchSidenavOpenService, private userSideNavOpenService : UserSidenavOpenService) { }
  
  ngOnInit(): void {
    this.onSetTheme()
  }

  onOpenSearchSidenav() {
    this.searchSideNavOpenService.changeOpenSearchNav(true)
  }

  onOpenUserSidenav() {
    this.userSideNavOpenService.changeOpenUserNav(true)
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
}
