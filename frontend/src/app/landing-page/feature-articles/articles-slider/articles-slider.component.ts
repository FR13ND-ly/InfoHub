import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { timer } from 'rxjs';
import { interval, Subscription } from 'rxjs';
import { ArticlePreview } from 'src/app/core/models/article.preview.model';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';

@Component({
  selector: 'app-articles-slider',
  templateUrl: './articles-slider.component.html',
  styleUrls: ['./articles-slider.component.scss']
})
export class ArticlesSliderComponent implements OnInit, OnDestroy {

  constructor(private articleService : ArticlesService) { }

  selectedIndex : number = 0;

  @ViewChild('selectorsWrapper') selectorsWrapper! : ElementRef
  @ViewChild('slider') slider! : ElementRef

  articles$ : Observable<ArticlePreview[]> = this.articleService.getSlider().pipe(
    delay(500)
  )

  sliderInterval! : Subscription
  repeatAnimationInterval! : Subscription

  ngOnInit(): void {
    this.sliderInterval = interval(6000).subscribe(() => {
      this.restartSliderAnimation()
      this.selectedIndex = ++this.selectedIndex % 5;
    })
    this.repeatAnimationInterval = interval(10000).subscribe(() => {
      this.restartSelectorsAnimation()
    })
  }

  onSelectIndex(index : number) : void {
    this.sliderInterval.unsubscribe()
    this.restartSliderAnimation()
    this.selectedIndex = index
    this.sliderInterval = interval(5000).subscribe(() => {
      this.restartSliderAnimation()
      this.selectedIndex = ++this.selectedIndex % 5;
    })
    
  }

  restartSelectorsAnimation() : void {
    Array.from(<HTMLCollection>this.selectorsWrapper.nativeElement.children).forEach((el : any, i ) => {
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
      el.style.animationDelay = `${ .1 * i }s`
    });
  }

  restartSliderAnimation() : void {
    this.slider.nativeElement.classList.toggle('appear')
    timer(0).subscribe(() => this.slider.nativeElement.classList.toggle('appear'))
  }

  ngOnDestroy() : void {
    this.sliderInterval.unsubscribe()
    this.repeatAnimationInterval.unsubscribe()
  }
}
