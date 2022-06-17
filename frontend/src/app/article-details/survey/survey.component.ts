import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';
import { UserSidenavOpenService } from 'src/app/shared/data-access/user-sidenav-open.service';
import { UserService } from 'src/app/shared/data-access/user.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements AfterViewInit {

  constructor(private el : ElementRef,private userService : UserService, private articlesService : ArticlesService, private route : ActivatedRoute, private _snackBar: MatSnackBar, private userSidenavOpen: UserSidenavOpenService) { }

  surveyIndex = 0;
  user! : any

  surveys$ : Observable<any> = this.route.params.pipe(
    switchMap((params : any) => this.userService.getUserUpdateListener().pipe(
      map((user) => this.user = user),
      switchMap((user) => this.articlesService.getSurvey({
        user : user.uid,
        url : params.url
      }))
    ))
  )
  
  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((surveyEntry : IntersectionObserverEntry) => {
        if (surveyEntry.isIntersecting) {
          surveyEntry.target.querySelector('.surveys')!.classList.add('show')
          observer.unobserve(surveyEntry.target)
        }
      })
    }, {threshold : .5})
    observer.observe(this.el.nativeElement)
  }

  onChangeSurveyNext(length : number) {
    this.surveyIndex = ++this.surveyIndex % length
  }

  onChangeSurveyPrev(length : number) {
    if (this.surveyIndex == 0) this.surveyIndex = length - 1
    else --this.surveyIndex
  }

  onVote(variant : any, variants : any)  {
    if (this.user) {
      this.articlesService.vote({
        id : variant.id, 
        user : this.user.uid
      }).subscribe()
      variant.votes += variant.voted ? -1 : 1
      variant.voted = !variant.voted
    }
    else {
      let snackbar = this._snackBar.open("Trebuie să te autentifici", "Autentificare", {duration: 3000});
      snackbar.onAction().subscribe(() => {
        this.userSidenavOpen.changeOpenUserNav(true);
      });
    }
  }
}
