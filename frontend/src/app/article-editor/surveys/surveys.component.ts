import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Survey } from 'src/app/core/models/survey.model';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  constructor() { }

  selectedTabIndex : number = 0

  @Input() surveys : Survey[] = []
  @Output() surveysChange = new EventEmitter()
  surveysResponse : any = []

  ngOnInit() {
    this.surveysResponse = this.surveys
  }

  onChange(): void {
    this.surveysChange.emit(JSON.parse(JSON.stringify(this.surveysResponse)))
  }


  onAddSurvey() {
    this.surveysResponse.push({
      question : "",
      variants : [[''], ['']]
    })
    this.selectedTabIndex = this.surveysResponse.length - 1;
  }

  onTabChange() {
    if (this.selectedTabIndex == this.surveysResponse.length) this.selectedTabIndex--
  }
}
