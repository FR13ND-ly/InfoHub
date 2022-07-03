import { Component, Input, OnInit } from '@angular/core';
import { ArticleDetails } from 'src/app/core/models/article.details.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  @Input() details!: ArticleDetails

}
