import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articlePreview'
})
export class ArticlePreviewPipe implements PipeTransform {

  transform(text: string, length : any) {
    if (length < 0) throw Error('Positive numbers required') 
    text = String(text).replace(/<[^>]+>/gm, '')
    text = text.split(" ").length < length ? text.split(" ").slice(0, length).join(" ") : text.split(" ").slice(0, length).join(" ") + '...'
    return  text
}

}
