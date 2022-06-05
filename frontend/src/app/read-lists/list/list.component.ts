import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadListsService } from '../read-lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private readListService : ReadListsService, private route: ActivatedRoute) { }

  listInfo = {
    name : "Citește mai târziu",
    author : "nu, tu",
    imageUrl : "https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg",
    length : 13,
    public : true
  }

  articles = [
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    },
    {
      imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5lvsXfIoXKRinJKhd7HaI9JKTPgRhRi64uUYxsjRN7UZDHNs3fZ1-5bFWnIXNxxzHtZg&usqp=CAU",
      title : "Lorem ipsum dolor sit amet",
      text : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis repudiandae assumenda voluptatum corporis. Tempore, sunt quas esse non repellendus, eveniet vero porro impedit fuga explicabo id. Quo aut eaque neque ipsam, eos placeat cupiditate quisquam officia"
    }
  ]

  ngOnInit(): void {
  }

  onChangeName(newName : string) {
    console.log(newName)
  }

  onChangeAccess() {
    this.listInfo.public = !this.listInfo.public
  }

  onCopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  onDelete() {

  }

}
