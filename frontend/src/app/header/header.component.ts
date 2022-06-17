import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SearchSidenavOpenService } from '../shared/data-access/search-sidenav-open.service';
import { UserSidenavOpenService } from '../shared/data-access/user-sidenav-open.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private searchSideNavOpenService : SearchSidenavOpenService, private userSideNavOpenService : UserSidenavOpenService, private scrollDispatcher: ScrollDispatcher) { }
  
  @ViewChild('header') headerRef! : ElementRef<HTMLElement>

  ngOnInit(): void {
    this.onSetTheme()
    this.scrollDispatcher.scrolled().
        subscribe((cdk: any) => {
          this.headerRef.nativeElement.classList.toggle('sticked', cdk.getElementRef().nativeElement.scrollTop > 30)
          // )
  
        })
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
