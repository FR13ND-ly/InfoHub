import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap, timer } from 'rxjs';
import { Survey } from 'src/app/core/models/survey.model';
import { Variant } from 'src/app/core/models/variant.model';
import { ArticlesService } from 'src/app/core/data-access/articles.service';
import { UserService } from 'src/app/core/data-access/user.service';
import { setUserSidenavState } from 'src/app/state/user-sidenav-open/user-sidenav-open.actions';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private userService: UserService,
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
    private store: Store<any>
  ) {}

  @Input() url! : string
  surveyIndex = 0;
  user!: any;

  surveys$: Observable<Survey[]> = timer(0).pipe(
    switchMap(() =>
      this.userService.getUserUpdateListener().pipe(
        tap((user) => this.user = user),
        switchMap((user) =>
          this.articlesService.getSurvey({
            user: user?.uid,
            url: this.url,
          })
        )
      )
    )
  );

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((surveyEntry: IntersectionObserverEntry) => {
          if (surveyEntry.isIntersecting) {
            surveyEntry.target
              .querySelector('.surveys')!
              ?.classList.add('show');
            observer.unobserve(surveyEntry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(this.el.nativeElement);
  }

  onChangeSurveyNext(length: number) {
    this.surveyIndex = ++this.surveyIndex % length;
  }

  onChangeSurveyPrev(length: number) {
    if (this.surveyIndex == 0) this.surveyIndex = length - 1;
    else --this.surveyIndex;
  }

  onVote(variant: Variant) {
    if (this.user) {
      this.articlesService
        .vote({
          id: variant.id,
          user: this.user.uid,
        })
        .subscribe();
      variant.votes += variant.voted ? -1 : 1;
      variant.voted = !variant.voted;
    } else {
      let snackbar = this._snackBar.open(
        'Trebuie să te autentifici',
        'Autentificare',
        { duration: 3000 }
      );
      snackbar.onAction().subscribe(() => {
        this.store.dispatch(setUserSidenavState({state : true}))
      });
    }
  }
}
