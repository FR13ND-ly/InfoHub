import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }

  @ViewChild('articleText') articleTextRef! : ElementRef

  @Input()
  text! : any

  ngOnInit(): void {
    this.text = this.domSanitizer.bypassSecurityTrustHtml(this.text)
  }

}
