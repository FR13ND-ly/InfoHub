import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, map, Observable, repeatWhen, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { timer } from 'rxjs';
import { interval, Subscription } from 'rxjs';
import { ArticlePreview } from 'src/app/core/models/article/article.preview.model';
import { ArticlesService } from 'src/app/core/data-access/articles.service';

@Component({
  selector: 'app-articles-slider',
  templateUrl: './articles-slider.component.html',
  styleUrls: ['./articles-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesSliderComponent implements OnDestroy {

  constructor(private articleService : ArticlesService) { }

  @ViewChild('selectorsWrapper') selectorsWrapper! : ElementRef
  @ViewChild('slider') slider! : ElementRef

  selectedIndex$ : BehaviorSubject<number> = new BehaviorSubject<number>(0)
  article$ : Observable<ArticlePreview> = this.selectedIndex$.pipe(
    tap(() => this.restartSliderAnimation()),
    switchMap((i : number) => this.articleService.getSlider().pipe(
      map((articles : ArticlePreview[]) : ArticlePreview => articles[i])
    ))
  )

  start$ = new Subject<void>();
  stop$ = new Subject<void>();

  sliderInterval : Subscription = interval(6000).pipe(
    takeUntil(this.stop$),
    repeatWhen(() => this.start$)
  ).subscribe(() => {
    this.selectedIndex$.next((this.selectedIndex$.value + 1) % 5)
  })
  repeatAnimationInterval: Subscription = interval(10000).subscribe(() => {
    this.restartSelectorsAnimation()
  })

  onSelectIndex(index : number) : void {
    this.stop$.next()
    this.selectedIndex$.next(index)
    this.start$.next()
  }

  restartSelectorsAnimation() : void {
    Array.from(<HTMLCollection>this.selectorsWrapper!.nativeElement.children).forEach((el : any, i ) => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
      el.style.animationDelay = `${ .1 * i }s`
    });
  }

  restartSliderAnimation() : void {
    if (!this.slider) return
    this.slider.nativeElement.classList.toggle('appear')
    timer(0).subscribe(() => this.slider!.nativeElement.classList.toggle('appear'))
  }

  ngOnDestroy() : void {
    this.sliderInterval.unsubscribe()
    this.repeatAnimationInterval.unsubscribe()
  }
}
