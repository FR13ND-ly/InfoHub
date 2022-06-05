import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  editorText! : string
  ngOnInit(): void {
    timer(100).subscribe(() => this.editorText = this.text)
  }

  onChange(text : string) {
    this.textChange.emit(text)
  }

}
