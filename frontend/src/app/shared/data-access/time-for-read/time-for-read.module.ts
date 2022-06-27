import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeForReadPipe } from './time-for-read.pipe';



@NgModule({
  declarations: [
    TimeForReadPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeForReadPipe
  ]
})
export class TimeForReadModule { }
