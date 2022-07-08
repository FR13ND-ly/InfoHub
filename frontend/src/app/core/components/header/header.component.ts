import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setUserSidenavState } from '../../../state/user-sidenav-open/user-sidenav-open.actions';
import { setSearchSidenavOpen } from '../../../state/search-sidenav/search-sidenav.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private store: Store<any>
  ) {}

  @ViewChild('header') headerRef!: ElementRef<HTMLElement>;

  loading$: Observable<boolean> = this.store.select('loading')
  progress$ : Observable<number> = this.store.select('readProgress')

  ngOnInit(): void {
    this.onSetTheme();
    this.scrollDispatcher.scrolled().pipe(
      filter((cdk : any) => !cdk.dir)
    )
    .subscribe((cdk: CdkScrollable) => {
      this.headerRef.nativeElement.classList.toggle(
        'sticked',
        cdk.getElementRef().nativeElement.scrollTop > 30
      );
    });
  }

  onOpenSearchSidenav() {
    this.store.dispatch(setSearchSidenavOpen({state : true}))
  }

  onOpenUserSidenav() {
    this.store.dispatch(setUserSidenavState({state : true}))
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
