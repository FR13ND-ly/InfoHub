import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleDetails } from 'src/app/core/models/article/article.details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {

  @Input() details!: ArticleDetails

}
