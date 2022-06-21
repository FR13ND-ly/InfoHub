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
    timer(100).subscribe(() => this.editorText = this.text)
  }

  onChange() {
    timer(0).subscribe(() => {
      this.textChange.emit(this.textEditorRef.nativeElement.innerHTML)
    })
  }

}
