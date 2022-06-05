import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss']
})
export class CoverImageComponent implements OnInit {

  constructor() { }

  @Input() imageUrl! : string
  @Input() coverImageDescription! : string

  ngOnInit(): void {
  }

}
