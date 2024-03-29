import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { delay, filter, Observable, switchMap, timer } from 'rxjs';
import { ReadListsService } from 'src/app/read-lists/read-lists.service';
import { UserService } from 'src/app/core/data-access/user.service';
import { setUserSidenavState } from 'src/app/state/user-sidenav-open/user-sidenav-open.actions';
import { LikesService } from './data-access/likes.service';
import { User } from 'src/app/core/models/user.model';
import { LightList } from 'src/app/core/models/readlist.light.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements AfterViewInit, OnInit {
  constructor(
    private likesService: LikesService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private readListsService: ReadListsService,
    private store: Store<any>
  ) {}

  @ViewChild('menuRef') menuRef!: ElementRef;

  user!: User;
  @Input() url!: string;
  showAddListMenu: boolean = false;

  likesInfo$: Observable<any> = this.userService.getUserUpdateListener().pipe(
    switchMap((user) =>
      this.likesService.getLikes({
        user: user ? user['uid'] : null,
        article: this.url,
      })
    )
  );

  lists$: Observable<LightList[]> = this.userService.getUserUpdateListener().pipe(
    filter((user: User) => !!user),
    switchMap((user) =>
      this.readListsService.getLightReadLists({
        user: user ? user['uid'] : null,
        article: this.url,
      })
    )
  );
  showSocials: boolean = false;

  ngOnInit(): void {
    this.userService.getUserUpdateListener().subscribe((user) => {
      this.user = user;
      this.readListsService
        .addView({ article: this.url, user: user ? user['uid'] : null })
        .subscribe();
    });
  }

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((menuEntry: IntersectionObserverEntry) => {
          if (menuEntry.isIntersecting) {
            menuEntry.target.classList.add('show');
            observer.unobserve(menuEntry.target);
          }
        });
      },
      { threshold: 0.001 }
    );
    observer.observe(this.menuRef.nativeElement);
  }

  onLikeInteract(likesInfo: any) {
    if (this.user) {
      this.likesService
        .interact({
          user: this.user["uid"],
          article: this.url,
        })
        .subscribe();
      likesInfo.liked =
        likesInfo.liked == 'favorite' ? 'favorite_outline' : 'favorite';
      if (likesInfo.hideLikes) return;
      likesInfo.likes += likesInfo.liked == 'favorite' ? 1 : -1;
    } else {
      let snackbar = this._snackBar.open(
        'Trebuie să te autentifici',
        'Autentificare',
        { duration: 3000 }
      );
      snackbar.onAction().subscribe(() => {
        this.store.dispatch(setUserSidenavState({ state : true }))
      });
    }
  }

  onShare(e: Event, link: string) {
    e.preventDefault();
    var windowShare: any = window.open(
      link + location.href,
      'facebook-popup',
      'height=350,width=600'
    );
    if (windowShare.focus) windowShare.focus();
  }

  onGetList() {
    this.lists$ = this.userService.getUserUpdateListener().pipe(
      delay(500),
      switchMap((user) =>
        this.readListsService.getLightReadLists({
          user: user['uid'],
          article: this.url,
        })
      )
    );
    this.lists$.subscribe(() => (this.showAddListMenu = false));
  }

  onAddToList(list: number) {
    this.readListsService
      .addToList({
        List: list,
        article: this.url,
      })
      .subscribe();
  }

  onAddList(form: NgForm) {
    this.readListsService
      .addReadList({
        name: form.value.name,
        access: form.value.access,
        user: this.user["uid"],
      })
      .subscribe(() => this.onGetList());
    form.reset();
  }
}
