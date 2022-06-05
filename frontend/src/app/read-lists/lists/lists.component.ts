import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  constructor() { }
  lists$ = of([
    {
      url : '23',
      name : "Bla bla bla",
      remain : {
        count : 12,
        imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
      },
      articles : [
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
      ]
    },
    {
      url : '324',
      name : "Bla bla bla",
      remain : {
        count : 12,
        imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
      },
      articles : [
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
      ]
    },
    {
      url : '32432',
      name : "Bla bla bla",
      remain : {
        count : 12,
        imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
      },
      articles : [
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
      ]
    },
    {
      url : '52',
      name : "Bla bla bla",
      remain : {
        count : 12,
        imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
      },
      articles : [
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
        {
          title : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, tempore.',
          imageUrl : 'https://wallpapershome.com/images/pages/pic_h/23480.jpg'
        },
      ]
    },
  ])
  ngOnInit(): void {
  }

}
