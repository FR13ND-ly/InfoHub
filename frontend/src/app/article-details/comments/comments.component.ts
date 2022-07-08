import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, switchMap, timer } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { Comment } from 'src/app/core/models/comment.model';
import { UserService } from 'src/app/core/data-access/user.service';
import { setUserSidenavState } from 'src/app/state/user-sidenav-open/user-sidenav-open.actions';
import { CommentsService } from './data-access/comments.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements AfterViewInit {
  constructor(
    private commentsService: CommentsService,
    private userService: UserService,
    private store: Store<any>,
    private dialog: MatDialog
  ) {}

  @Input() url! : string

  @ViewChildren('commentRef') commentsRef!: QueryList<ElementRef>;

  comments$: Observable<Comment[]> = timer(0).pipe(
    switchMap(() => this.commentsService.getComments(this.url))
  )

  user$: Observable<User> = this.userService.getUserUpdateListener();

  observer : IntersectionObserver = new IntersectionObserver((comments) => {
    this.observeArticles(comments);
  });

  ngAfterViewInit() {
    this.commentsRef.toArray().forEach((comment: ElementRef) => {
      this.observer.observe(comment.nativeElement);
    });
    this.commentsRef.changes.subscribe((comments: Array<ElementRef>) => {
      comments.forEach((comment: ElementRef) => {
        this.observer.observe(comment.nativeElement);
      });
    });
  }

  onOpenUserSidenav() {
    this.store.dispatch(setUserSidenavState({ state : true }))
  }

  observeArticles(comments: IntersectionObserverEntry[]) {
    comments.forEach((comment: IntersectionObserverEntry) => {
      if (comment.isIntersecting) {
        comment.target.classList.add('show');
        this.observer.unobserve(comment.target);
      }
    });
  }

  onAddComment(form: NgForm, user: User, comments: Comment[]) {
    if (!form.form.value.text.trim()) return;
    let data: any = {
      username: user['displayName'],
      author: user['uid'],
      text: form.form.value.text,
      article: this.url,
      image: user.image,
    };
    this.commentsService.addComment(data).subscribe(() => {
      data.date = 'Numai ce...';
      data.photoUrl = user.imageUrl;
      comments.unshift(data);
      form.reset();
    });
  }

  onDeleteComment(id: number, commentRef : HTMLElement) {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent);
    confirmDialog.afterClosed().subscribe((res) => {
      if (res) {
        commentRef.classList.add('delete')
        this.commentsService.removeComment(id).subscribe();
        timer(800).subscribe(() => commentRef.remove())
      }
    })
    
  }
}
