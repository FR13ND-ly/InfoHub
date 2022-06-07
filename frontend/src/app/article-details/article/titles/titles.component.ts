import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss']
})
export class TitlesComponent implements OnInit {

  constructor() { }

  @Input() title! : string
  @Input() subtitle! : string

  ngOnInit(): void {
  }

}