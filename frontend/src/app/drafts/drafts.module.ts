import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraftsComponent } from './drafts.component';
import { RouterModule } from '@angular/router';
import { ArticleModule } from '../core/components/article/article.module';



@NgModule({
  declarations: [
    DraftsComponent
  ],
  imports: [
    CommonModule,
    ArticleModule,
    RouterModule.forChild([
      {path: '', component: DraftsComponent}
    ])
  ]
})
export class DraftsModule { }
