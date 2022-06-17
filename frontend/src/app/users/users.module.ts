import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {path: '', component: UsersComponent}
    ])
  ]
})
export class UsersModule { }
