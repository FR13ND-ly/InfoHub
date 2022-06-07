import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { ReadListsService } from 'src/app/read-lists/read-lists.service';
import { UserSidenavOpenService } from 'src/app/shared/data-access/user-sidenav-open.service';
import { UserService } from 'src/app/shared/data-access/user.service';
import { LikesService } from './data-access/likes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit, OnInit {

  constructor(private likesService : LikesService, private userService : UserService, private route: ActivatedRoute, private _snackBar: MatSnackBar, private userSidenavOpen: UserSidenavOpenService, private readListsService : ReadListsService) { }

  @ViewChild('menuRef') menuRef! : ElementRef

  user! : any
  url! : string
  likes! : number
  liked! : string
  showAddListMenu : boolean = false

  lists : any = []
  showSocials: boolean = false

  ngOnInit(): void {
    this.route.params.subscribe((params : any) => this.url = params.url)
    this.getLikes()
    this.userService.getUserUpdateListener().subscribe((user) => {
      this.user = user
      this.getLikes()
      this.readListsService.addView({ article : this.url, user : this.user.uid}).subscribe()
    })
  }

  getLikes() {
    this.likesService.getLikes(
      {
        token : this.user ? this.user.uid : '',
        url : this.url
      }
    ).subscribe((res : any) => {
      this.likes = res.likes
      this.liked = res.liked
    })
  }

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((menuEntry : IntersectionObserverEntry) => {
        if (menuEntry.isIntersecting) {
          menuEntry.target.classList.add('show')
          observer.unobserve(menuEntry.target)
        }
      })
    }, {threshold : .001})
    observer.observe(this.menuRef.nativeElement)
  }

  onLikeInteract() {
    if (this.user) {
      this.likesService.interact({
        token : this.user.uid,
        url : this.url
      }).subscribe(() => this.getLikes())
    }
    else {
      let snackbar = this._snackBar.open("Trebuie să te autentifici", "Autentificare", {duration: 3000});
      snackbar.onAction().subscribe(() => {
        this.userSidenavOpen.changeOpenUserNav(true);
      });
    }
  }

  onShare(e : any, link : string) {
    e.preventDefault();
    var windowShare : any = window.open(
      link + location.href,
      'facebook-popup',
      'height=350,width=600'
    );
    if (windowShare.focus) {
      windowShare.focus();
    }
  }

  onGetList() {
    this.readListsService.getLightReadLists({
      user : this.user.uid,
      article : this.url
    })
    .subscribe((lists) => {
      this.lists = lists
      this.showAddListMenu = false
    })
  }

  onAddToList(list : number) {
    this.readListsService.addToList({
      List : list,
      article : this.url
    }).subscribe()
  }

  onAddList(form : NgForm) {
    this.readListsService.addReadList({
      name : form.value.name,
      access : form.value.access,
      user : this.user.uid
    }).subscribe(() => this.onGetList())
    form.reset()
  }
}