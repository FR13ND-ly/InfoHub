import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { FilesService } from './data-access/files.service';
import { FilesDialogData } from './files-dialog-data.model';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.scss']
})
export class FilesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : FilesDialogData, private fileService : FilesService) { }

  images : Array<any> = []

  index: number = 1
  noMoreImages : boolean = true

  ngOnInit(): void {
    this.getFiles()
  }

  getFiles() {
    this.fileService.getFiles(this.index).subscribe((res : any)=> {
      this.images.push(...res.files)
      this.noMoreImages = res.noMoreFiles
    })
  }

  includes(image : any) : boolean {
    let res : boolean = false
    this.data.selectedImages.forEach((item : any) => {
      if (item.id == image.id) res = true
    })
    return res
  }

  removeImage(image : any) : void {
    this.data.selectedImages.filter((item : any) => {
      return item.id != image.id
    })
  }

  loadMore() {
    this.index++
    this.getFiles()
  }

  onSelectImage(image : any) {
    if (this.includes(image)) this.removeImage(image) 
    else {
      if (this.data.multipleSelect) this.data.selectedImages.push(image)
      else this.data.selectedImages = [image]
    }
  }

  onAddFile(e : any) {
    let file = e.target.files[0]
    let formData = new FormData()
    formData.append('file', file, file.name)
    this.fileService.addFile(formData).subscribe(() => {
      this.index = 1
      this.fileService.getFiles(this.index).subscribe((res : any)=> {
        this.images = res.files
      })
    })
  }
}
