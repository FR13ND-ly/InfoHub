import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesDialogData } from '../files-dialog/files-dialog-data.model';
import { FilesDialogComponent } from '../files-dialog/files-dialog.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  widgets = [
    {
      url : "",
      imageUrl : "",
      title : "2",
      activated : false,
    },
    {
      url : "",
      imageUrl : "",
      title : "324",
      activated : false
    },
    {
      url : "",
      imageUrl : "",
      author : "erf",
      title : "324",
      activated : false
    },
  ]

  ngOnInit(): void {
  }

  onChangeImage(index: number) {
    const filesDialog = this.dialog.open(FilesDialogComponent, {
      panelClass : 'files-dialog',
      autoFocus: false,
      data : {
        selectedImages : [],
        multipleSelect : false
      }
    })
    filesDialog.afterClosed().subscribe((data : FilesDialogData) => {
      this.widgets[index].imageUrl = data.selectedImages[0].imageUrl
    })
  }

}
