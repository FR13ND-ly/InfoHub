import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { TextMoment } from 'src/app/core/models/text-moment.model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('articleText') text! : ElementRef<HTMLElement>
  @Input() article! : string
  minimalize: boolean = false
  moments : TextMoment[] = []

  moments$ : BehaviorSubject<TextMoment[]> = new BehaviorSubject<TextMoment[]>([])
  
  ngAfterViewInit(): void {
    this.moments$.next([])
    timer(0).subscribe(() => {
      document.querySelectorAll(`#${this.article} .text h1`)?.forEach((element : any) => {
        this.moments$.next(
          this.moments$.value.concat([{
            "content": element.innerText,
            "element": element
          }])
        )
      })
    })
  }

  onGoToTitle(moment: HTMLElement) {
    moment.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    moment.className = ""
    timer(100).subscribe(() => moment.className = "scroll-to")
  }
}
