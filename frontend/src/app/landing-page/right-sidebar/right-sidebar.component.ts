import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor() { }

  widget$ = of({
    url : '342',
    imageUrl : "https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg",
    title : "Prima școală portocalie din Nisporeni"
  })

  weeklyImg = {
    url : '',
    title : "Ulitza pushkina",
    author : "dom kalatushkina",
    imageUrl : "https://material.angular.io/assets/img/examples/shiba2.jpg",
  }

  weeklyImgRevealed : boolean = false;
  
  ngOnInit(): void {
  }

}
