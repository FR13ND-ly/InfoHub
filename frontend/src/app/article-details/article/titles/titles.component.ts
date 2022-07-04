import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class TitlesComponent {

  @Input() title! : string
  @Input() subtitle! : string

}
