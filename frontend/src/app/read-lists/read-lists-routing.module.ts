import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  {path: "", component : ListsComponent},
  {path: ":url", component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadListsRoutingModule { }
