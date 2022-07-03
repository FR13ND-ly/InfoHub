import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { timer } from 'rxjs';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  @ViewChild('articleText') articleTextRef! : ElementRef

  @Input()
  text! : any | SafeHtml

  ngOnInit(): void {
    this.text = this.domSanitizer.bypassSecurityTrustHtml(this.text)
    timer(0).subscribe(() => {
      Array.from(document.querySelectorAll('.text img')).forEach((img : any) => {
        let div = document.createElement('div')
        img.parentNode.insertBefore(div, img)
        div.appendChild(img)
        div.classList.add('img-container')
        div.addEventListener('click', () => {
          div.classList.toggle('zoom')
        })
      })
    })
    
  }

}
