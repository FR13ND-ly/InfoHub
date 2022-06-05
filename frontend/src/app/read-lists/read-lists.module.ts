import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadListsComponent } from './read-lists.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './list/list.component';
import { ReadListsRoutingModule } from './read-lists-routing.module';
import { MaterialModule } from '../material.module';
import { ArticleModule } from '../shared/article/article.module';



@NgModule({
  declarations: [
    ReadListsComponent,
    ListsComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    ReadListsRoutingModule,
    MaterialModule,
    ArticleModule
  ]
})
export class ReadListsModule { }
