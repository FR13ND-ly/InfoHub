import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadListsComponent } from './read-lists.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { ReadListsRoutingModule } from './read-lists-routing.module';
import { MaterialModule } from '../material.module';
import { ArticleModule } from '../core/components/article/article.module';
import { AddReadlistDialogComponent } from './add-readlist-dialog/add-readlist-dialog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReadListsComponent,
    ListsComponent,
    ListComponent,
    AddReadlistDialogComponent,
  ],
  imports: [
    CommonModule,
    ReadListsRoutingModule,
    MaterialModule,
    ArticleModule,
    FormsModule
  ]
})
export class ReadListsModule { }
