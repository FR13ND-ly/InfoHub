import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.scss']
})
export class YoutubeVideosComponent implements OnInit {

  constructor() { }

  selectedIndex: number = 0;
  youtubeVideos = [
    {
      title: "Lorem ipsum dolor sit amet. fsa gsdsf sdsg fg sfad sgdfada",
      imageUrl : "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      imageUrl : "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      imageUrl : "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      imageUrl : "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      imageUrl : "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      imageUrl : "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"
    },
    {
      title: "Lorem ipsum dolor sit amet.",
      imageUrl : "https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-thumb.jpg"
    },
  ]

  ngOnInit(): void {
  }

}
