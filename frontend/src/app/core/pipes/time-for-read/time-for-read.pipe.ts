import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeForRead'
})
export class TimeForReadPipe implements PipeTransform {

  transform(length: number): string {
    if (length < 0) throw Error('Positive numbers required') 
    let res : string = ''
    if (length > 3600) return "ore..."
    if (length > 60) res += `${Math.trunc(length / 60)}min `
    if (length % 60) res += `${Math.trunc(length % 60)}s`
    return res;
  }

}
