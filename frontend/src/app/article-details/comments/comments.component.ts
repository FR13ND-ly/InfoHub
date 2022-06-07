import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Observable, switchMap } from 'rxjs';
import { UserSidenavOpenService } from 'src/app/shared/data-access/user-sidenav-open.service';
import { UserService } from 'src/app/shared/data-access/user.service';
import { CommentsService } from './data-access/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {

  constructor(private commentsService : CommentsService, private userService : UserService, private route: ActivatedRoute, private userSideNavOpenService : UserSidenavOpenService) { }

  @ViewChildren('commentRef') commentsRef! : QueryList<ElementRef>

  comments$ : Observable<any> = this.route.params.pipe(
    first((params : any) => this.url = params.url),
    switchMap((params : any) => this.commentsService.getComments(params.url))
  )
  
  user! : any
  url! : string
  observer = new IntersectionObserver((comments) => {this.observeArticles(comments)});

  ngOnInit(): void {
    this.userService.getUserUpdateListener().subscribe((user) => {
      this.user = user
    })
  }

  getComments() {
    this.comments$ = this.commentsService.getComments(this.url)
  }

  ngAfterViewInit() {
    this.commentsRef.toArray().forEach((comment : ElementRef) => {
      this.observer.observe(comment.nativeElement)
    })
    this.commentsRef.changes.subscribe((comments : Array<ElementRef>) => {
      comments.forEach((comment: ElementRef) => {
        this.observer.observe(comment.nativeElement)
      })
    })
  }

  onOpenUserSidenav() {
    this.userSideNavOpenService.changeOpenUserNav(true)
  }

  observeArticles(comments : any) {
    comments.forEach((comment : IntersectionObserverEntry) => {
      if (comment.isIntersecting){
        comment.target.classList.add("show")
        this.observer.unobserve(comment.target)
      }
    })
  }

  onAddComment(form : any) {
    let data : any = {
      username : this.user.displayName,
      author : this.user.uid,
      text : form.form.value.text,
      article : this.url,
      photoUrl : this.user.photoURL
    }
    this.commentsService.addComment(data).
    subscribe(() => {
      this.getComments()
    })
    form.reset()
  }

  onDeleteComment(id : number, index : number) {
    if (!confirm("Ești sigur?")) return
    this.commentsService.removeComment(id)
    .subscribe(() => {
      this.getComments()
    })
  }
}
