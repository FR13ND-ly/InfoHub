import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  constructor() { }

  selectedTabIndex : number = 0

  surveys : any = []

  ngOnInit(): void {
  }


  onAddSurvey() {
    this.surveys.push(
      {
        question : "",
        answers : [[''], ['']]
      }
    )
    this.selectedTabIndex = this.surveys.length - 1;
  }

  onTabChange() {
    if (this.selectedTabIndex == this.surveys.length) this.selectedTabIndex--
  }
}
