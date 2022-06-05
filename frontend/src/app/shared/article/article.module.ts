import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component'
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ArticlePreviewModule } from '../article-preview/article-preview.module';



@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ArticlePreviewModule
  ],
  exports: [
    ArticleComponent,
  ]
})
export class ArticleModule { }
