import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  constructor() { }
  @Input() text! : string
  @Output() textChange = new EventEmitter()

  @ViewChild('textEditorRef') textEditorRef! : ElementRef<HTMLElement>
  editorText! : string

  ngOnInit(): void {
    timer(100).subscribe(() => {
      this.editorText = this.text
      // this.imagesResolve()
    })
  }

  onChange() {
    // this.imagesResolve()
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

  addImageEditContainer(img : any) {
    let div = document.createElement('div')
    img.parentNode.insertBefore(div, img)
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

  destroyDiv(div : any, img : any) {
    div.insertBefore(img.cloneNode(), div)
    div.remove
  }
}
