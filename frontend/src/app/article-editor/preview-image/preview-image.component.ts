import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesDialogData } from 'src/app/files-dialog/files-dialog-data.model';
import { FilesDialogComponent } from 'src/app/files-dialog/files-dialog.component';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent {

  constructor(private dialog: MatDialog) { }

  @Input() imageUrl! : string

  @Input() coverImage! : number
  @Output() coverImageChange = new EventEmitter()

  @Input() coverImageDescription! : string
  @Output() coverImageDescriptionChange = new EventEmitter()
 

  onSelectImage() {
    const filesDialog = this.dialog.open(FilesDialogComponent, {
      panelClass : 'files-dialog',
      autoFocus: false,
      data : {
        selectedImages : [],
        multipleSelect : false
      }
    })
    filesDialog.afterClosed().subscribe((data : FilesDialogData) => {
      this.imageUrl = data.selectedImages[0].imageUrl
      this.coverImageChange.emit(data.selectedImages[0].id)
    })
  }

}
