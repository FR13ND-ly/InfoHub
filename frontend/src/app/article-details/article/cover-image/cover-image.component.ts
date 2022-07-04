import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CoverImageComponent {

  @Input() imageUrl! : string
  @Input() coverImageDescription! : string

}
