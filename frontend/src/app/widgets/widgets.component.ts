import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Widget } from '../core/models/widget.model';
import { FilesDialogData } from '../files-dialog/files-dialog-data.model';
import { FilesDialogComponent } from '../files-dialog/files-dialog.component';
import { WidgetsService } from './data-access/widgets.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent {

  constructor(private dialog: MatDialog, private widgetsService : WidgetsService) { }

  widgets$ : Observable<Widget[]> = this.widgetsService.getWidgets()

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
      widget.imageUrl = data.selectedImages[0].imageUrl
      widget.imageId = data.selectedImages[0].id
    })
  }

  onSave(widget : Widget, index : number) {
    this.widgetsService.editWidget(index + 1, widget).subscribe()
  }

}
