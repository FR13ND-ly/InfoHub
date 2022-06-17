import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('articleText') text! : ElementRef<HTMLElement>

  minimalize: boolean = false
  moments : any = [
  ]
  ngAfterViewInit(): void {
    timer(0).subscribe(() => {
      console.log(document.querySelectorAll('.text'))
      document.querySelectorAll('.text h1')?.forEach((element : any) => {
        this.moments.push({
          "content" : element.innerText,
          "element" : element
        })
      })
    })
  }

  onGoToTitle(moment: any) {
    moment.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    moment.className = ""
    timer(100).subscribe(() => moment.className = "scroll-to")
  }
}
