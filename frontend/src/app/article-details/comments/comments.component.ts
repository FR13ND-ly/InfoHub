import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user.service';
import { setUserSidenavState } from 'src/app/state/user-sidenav-open/user-sidenav-open.actions';
import { CommentsService } from './data-access/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, AfterViewInit {
  constructor(
    private commentsService: CommentsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private store: Store<any>
  ) {}

  @ViewChildren('commentRef') commentsRef!: QueryList<ElementRef>;

  comments$: Observable<any> = this.route.params.pipe(
    first((params: any) => (this.url = params.url)),
    switchMap((params: any) => this.commentsService.getComments(params.url))
  );

  user$: Observable<any> = this.userService.getUserUpdateListener();
  url!: string;
  observer = new IntersectionObserver((comments) => {
    this.observeArticles(comments);
  });

  ngOnInit(): void {}

  getComments() {
    this.comments$ = this.commentsService.getComments(this.url);
  }

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

  observeArticles(comments: any) {
    comments.forEach((comment: IntersectionObserverEntry) => {
      if (comment.isIntersecting) {
        comment.target.classList.add('show');
        this.observer.unobserve(comment.target);
      }
    });
  }

  onAddComment(form: any, user: any, comments: Array<any>) {
    if (!form.form.value.text.trim()) return;
    let data: any = {
      username: user.displayName,
      author: user.uid,
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

  onDeleteComment(id: number, index: number, comments: any) {
    if (!confirm('Ești sigur?')) return;
    this.commentsService.removeComment(id).subscribe(() => {
      comments.splice(index, 1);
    });
  }
}
