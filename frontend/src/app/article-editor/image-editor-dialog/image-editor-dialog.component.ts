import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-editor-dialog',
  templateUrl: './image-editor-dialog.component.html',
  styleUrls: ['./image-editor-dialog.component.scss']
})
export class ImageEditorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any) { }

  sizes = [
    {
      value : 'small',
      viewValue : 'Mică',
    },
    {
      value : 'medium',
      viewValue : 'Medie',
    },
    {
      value : 'big',
      viewValue : 'Mare',
    },
  ]
  ngOnInit(): void {
  }

}
