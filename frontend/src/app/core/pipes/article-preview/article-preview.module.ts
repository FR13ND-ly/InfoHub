import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePreviewPipe } from './article-preview.pipe';



@NgModule({
  declarations: [
    ArticlePreviewPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArticlePreviewPipe
  ]
})
export class ArticlePreviewModule { }
