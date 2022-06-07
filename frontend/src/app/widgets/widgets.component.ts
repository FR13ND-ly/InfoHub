import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FilesDialogData } from '../files-dialog/files-dialog-data.model';
import { FilesDialogComponent } from '../files-dialog/files-dialog.component';
import { WidgetsService } from './data-access/widgets.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  constructor(private dialog: MatDialog, private widgetsService : WidgetsService) { }

  widgets$ : Observable<any> = this.widgetsService.getWidgets()

  ngOnInit(): void {
  }

  onChangeImage(widget : any, index: number) {
    const filesDialog = this.dialog.open(FilesDialogComponent, {
      panelClass : 'files-dialog',
      autoFocus: false,
      data : {
        selectedImages : [],
        multipleSelect : false
      }
    })
    filesDialog.afterClosed().subscribe((data : FilesDialogData) => {
      console.log(data)
      widget.imageUrl = data.selectedImages[0].imageUrl
      widget.imageId = data.selectedImages[0].id
    })
  }

  onSave(widget : any, index : any) {
    this.widgetsService.editWidget(index + 1, widget).subscribe()
  }

}
