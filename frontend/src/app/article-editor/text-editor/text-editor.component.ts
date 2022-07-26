import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { timer } from 'rxjs';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer) { }
  @Input() text! : string
  @Output() textChange = new EventEmitter()

  @ViewChild('textEditorRef') textEditorRef! : ElementRef<HTMLElement>
  editorText! : any

  ngOnInit(): void {
    this.editorText = this.domSanitizer.bypassSecurityTrustHtml(this.text)
  }

  onChange() {
    timer(0).subscribe(() => {
      this.textChange.emit(this.textEditorRef.nativeElement.innerHTML)
    })
  }

  imagesResolve() {
    timer(0).subscribe(() => {
      Array.from(document.querySelectorAll('#text-editor img')).forEach((img : any) => {
        img.addEventListener('click', this.addImageEditContainer(img))
      })
    })
  }

  addImageEditContainer(img : HTMLElement) {
    let div = document.createElement('div')
    img.parentNode!.insertBefore(div, img)
    div.appendChild(img)
    div.classList.add('img-editor-container')
    let buttonsWrapper = document.createElement('div')
    buttonsWrapper.classList.add('img-editor-container__buttons-wrapper')
    div.appendChild(buttonsWrapper)
    let editButton = document.createElement('mat-icon')
    editButton.innerHTML = 'edit' 
    buttonsWrapper.append(editButton)
    div.addEventListener('mouseleave', () => this.destroyDiv(div, img))
  }

  destroyDiv(div : HTMLElement, img : HTMLElement) {
    div.insertBefore(img.cloneNode(), div)
    div.remove
  }
}
