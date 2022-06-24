import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  constructor(private articleService : ArticlesService) { }

  articles : any[] = []
  index: number = 1
  noMoreArticles: boolean = true
  primeLoading:boolean = true

  ngOnInit(): void {
    this.articleService.getArticles(this.index).subscribe((res : any)=> {
      this.primeLoading = false
      this.articles.push(...res.articles)
      this.index++
      this.noMoreArticles = res.noMoreArticles
    })
  }

  loadMoreArticles() {
    if (this.noMoreArticles) return
    this.articleService.getArticles(this.index).subscribe((res : any)=> {
      this.articles.push(...res.articles)
      this.index++
      this.noMoreArticles = res.noMoreArticles
    })
  }

}
