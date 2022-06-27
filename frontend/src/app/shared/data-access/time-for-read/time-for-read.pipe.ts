import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeForRead'
})
export class TimeForReadPipe implements PipeTransform {

  transform(length: number): string {
    let res : string = ''
    if (length > 60) res += `${Math.trunc(length / 60)}min `
    if (length % 60) res += `${Math.trunc(length % 60)}s`
    return res;
  }

}
