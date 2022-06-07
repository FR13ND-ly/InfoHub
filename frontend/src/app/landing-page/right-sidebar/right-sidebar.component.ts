import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WidgetsService } from 'src/app/widgets/data-access/widgets.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor(private widgetsService : WidgetsService) { }


  // weeklyImg = {
  //   url : '',
  //   title : "Ulitza pushkina",
  //   author : "dom kalatushkina",
  //   imageUrl : "https://material.angular.io/assets/img/examples/shiba2.jpg",
  // }
  widget$ : Observable<any> = this.widgetsService.getWidget(2)
  weeklyImg$ : Observable<any> = this.widgetsService.getWidget(3)

  weeklyImgRevealed : boolean = false;
  
  ngOnInit(): void {
  }

}
