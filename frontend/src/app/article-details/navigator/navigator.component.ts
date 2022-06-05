import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements AfterViewInit {

  constructor() { }

  minimalize: boolean = false
  moments : any = [
  ]
  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log(document.querySelectorAll('.text'))
      document.querySelectorAll('.text h1')?.forEach((element : any) => {
        this.moments.push({
          "content" : element.innerText,
          "element" : element
        })
      })
      console.log(this.moments)
    }, 0)
  }

  onGoToTitle(moment: any) {
    moment.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
    moment.className = ""
    setTimeout(()=> moment.className = "scroll-to", 0)
  }
}
