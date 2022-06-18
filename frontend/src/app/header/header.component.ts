import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../shared/data-access/loading.service';
import { ReadProgressService } from '../shared/data-access/read-progress.service';
import { SearchSidenavOpenService } from '../shared/data-access/search-sidenav-open.service';
import { UserSidenavOpenService } from '../shared/data-access/user-sidenav-open.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private searchSideNavOpenService: SearchSidenavOpenService,
    private userSideNavOpenService: UserSidenavOpenService,
    private scrollDispatcher: ScrollDispatcher,
    private loadingService: LoadingService,
    private readProgress : ReadProgressService
  ) {}

  @ViewChild('header') headerRef!: ElementRef<HTMLElement>;

  loading$: Observable<boolean> = this.loadingService.getLoadingListener();
  progress$ : Observable<number> = this.readProgress.getProgressListener()

  ngOnInit(): void {
    this.onSetTheme();
    this.scrollDispatcher.scrolled().subscribe((cdk: any) => {
      this.headerRef.nativeElement.classList.toggle(
        'sticked',
        cdk.getElementRef().nativeElement.scrollTop > 30
      );
    });
  }

  onOpenSearchSidenav() {
    this.searchSideNavOpenService.changeOpenSearchNav(true);
  }

  onOpenUserSidenav() {
    this.userSideNavOpenService.changeOpenUserNav(true);
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
}
