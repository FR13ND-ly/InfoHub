import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesDialogData } from 'src/app/files-dialog/files-dialog-data.model';
import { FilesDialogComponent } from 'src/app/files-dialog/files-dialog.component';
import { ImageEditorDialogComponent } from '../image-editor-dialog/image-editor-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private elRef: ElementRef, private dialog: MatDialog) { }

  colors = [
    ["Negru" , "#212121"],
    ["Alb" , "#fff"],
    ["Roșu" , "#f44336"],
    ["Roz" , "#e91e63"],
    ["Violet" , "#9c27b0"],
    ["Albastru" , "#2196f3"],
    ["Teal" , "#009688"],
    ["Verde" , "#4caf50"],
    ["Galben" , "#ffeb3b"],
    ["Oranj" , "#ff9800"],
    ["Cafeniu" , "#795548"],
  ]

  backColors = [
    ["Transparent" , "transparent"],
    ["Negru" , "#212121"],
    ["Alb" , "#fff"],
    ["Roșu" , "#f44336"],
    ["Roz" , "#e91e63"],
    ["Violet" , "#9c27b0"],
    ["Albastru" , "#2196f3"],
    ["Teal" , "#009688"],
    ["Verde" , "#4caf50"],
    ["Galben" , "#ffeb3b"],
    ["Oranj" , "#ff9800"],
    ["Cafeniu" , "#795548"],
  ]

  formats = [
    ['Citat', 'blockquote'],
    ['Paragraf', 'p'],
    ['Titlu 1', 'h1'],
    ['Titlu 2', 'h2'],
    ['Titlu 3', 'h3'],
    ['Titlu 4', 'h4'],
    ['Titlu 5', 'h5'],
    ['Titlu 6', 'h6'],
    ['Preformatat', 'pre'],
  ]

  fonts = [
    "Arial",
    "Poppins",
    "Impact",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Calibri",
    "Roboto"
  ]

  codeView : boolean = false
  textEditor! : HTMLElement

  ngOnInit(): void {
    this.textEditor = this.elRef.nativeElement.parentElement.children.item(3).children.item(0)
  }

  format(style : string, value? : string) {
    if (this.codeView) return
    this.textEditor.focus()
    document.execCommand(style, false, value);
  }

  onAddYoutubeVideo() {
    let video = prompt("Inserează link-ul la video");
    let location = video?.search("v=")
    this.textEditor.focus()
    if (video?.trim()) this.format('insertHTML', `<div class="video-container"><iframe src="https://www.youtube.com/embed/${video?.slice(location! + 2, location! + 13)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`);
  }

  onSetFirstParagraph() {
    document.execCommand('formatblock', false, 'p')
    let firstParagraph = (<any>window.getSelection()).anchorNode.parentNode;
    firstParagraph.classList = 'first-paragraph';
  }

  onSetLink() {
    this.format('formatBlock', 'a')
    let a = (<any>window.getSelection()).anchorNode.parentNode;
    let link = prompt("Inserează un link");
    
    console.log(a)
  //   // a.href = link;
  }

  onSetView() {
    if (this.codeView) this.textEditor.innerHTML = this.textEditor.innerText
    else this.textEditor.innerText = this.textEditor.innerHTML
    this.codeView = !this.codeView
    this.textEditor.classList.toggle('code-view')
  }

  onAddImage() {
    const filesDialog = this.dialog.open(FilesDialogComponent, {
      panelClass : 'files-dialog',
      autoFocus: false,
      data : {
        selectedImages : [],
        multipleSelect : false
      }
    })
    filesDialog.afterClosed().subscribe((data : FilesDialogData) => {
      if (data.selectedImages.length == 1) this.editImage(data.selectedImages[0].imageUrl)
    })
  }

  editImage(image : any) {
    const imageEditorDialog = this.dialog.open(ImageEditorDialogComponent, {
      panelClass : 'image-editor-dialog',
      autoFocus: false,
      data : {
        imageUrl : image,
        legend : '',
        align : "left",
        size : 'medium'
      }
    })
    imageEditorDialog.afterClosed().subscribe((data : any) => {
      this.format(
        "insertHTML", 
        `<img src="${data.imageUrl}"
              width="${this.getSize(data.size)}"
              matTooltip="${data.legend}"
              align="${data.align}">
        `)
    })
  }

  getSize(size : string) : string {
    switch(size) {
      case 'small':
        return '30%'
      case 'medium':
        return '50%'
      case 'big':
        return '100%'
      default:
        return '50%'
    }

  }

  onAddGallery() {

  }
}
