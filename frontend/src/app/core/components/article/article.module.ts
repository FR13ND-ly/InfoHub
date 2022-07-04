import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component'
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { ArticlePreviewModule } from '../../pipes/article-preview/article-preview.module';
import { TimeForReadModule } from '../../pipes/time-for-read/time-for-read.module';



@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ArticlePreviewModule,
    TimeForReadModule
  ],
  exports: [
    ArticleComponent,
  ]
})
export class ArticleModule { }
