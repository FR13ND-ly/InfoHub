import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorComponent } from './article-editor.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/modules/material.module';
import { MenuComponent } from './menu/menu.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TagsComponent } from './tags/tags.component';
import { SurveysComponent } from './surveys/surveys.component';
import { PreviewImageComponent } from './preview-image/preview-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageEditorDialogComponent } from './image-editor-dialog/image-editor-dialog.component';



@NgModule({
  declarations: [
    ArticleEditorComponent,
    MenuComponent,
    TextEditorComponent,
    TagsComponent,
    SurveysComponent,
    PreviewImageComponent,
    ImageEditorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path : '', component : ArticleEditorComponent}
    ])
  ]
})
export class ArticleEditorModule { }
