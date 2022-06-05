import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements AfterViewInit {

  constructor() { }
  
  @ViewChild('surveyRef') surveyRef! : ElementRef

  surveyIndex = 0;
  surveys = [
    {
      question: "Bla bla?",
      answers: [
        {
          text : "Bla bla bla",
          votes : 51,
        },
        {
          text : "Bla bla bla",
          votes : 51,
        },
        {
          text : "Bla bla bla",
          votes : 51,
        },
      ]
    },
    {
      question: "Bla bla?",
      answers: [
        {
          text : "Bla bla bla",
          votes : 51,
        },
        {
          text : "Bla bla bla",
          votes : 51,
        },
        {
          text : "Bla bla bla",
          votes : 51,
        },
      ]
    },
    {
      question: "Bla bla?",
      answers: [
        {
          text : "Bla bla bla",
          votes : 51,
        },
        {
          text : "Bla bla bla",
          votes : 51,
        },
        {
          text : "Bla bla bla",
          votes : 51,
        },
      ]
    }
  ]
  
  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((surveyEntry : IntersectionObserverEntry) => {
        if (surveyEntry.isIntersecting) {
          surveyEntry.target.classList.add('show')
          observer.unobserve(surveyEntry.target)
        }
      })
    }, {threshold : .5})
    observer.observe(this.surveyRef.nativeElement)
  }

  onChangeSurveyNext() {
    this.surveyIndex = ++this.surveyIndex % this.surveys.length
  }

  onChangeSurveyPrev() {
    if (this.surveyIndex == 0) this.surveyIndex = this.surveys.length - 1
    else --this.surveyIndex
  }
}
