import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { delay, Observable, switchMap } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';

@Component({
  selector: 'article-details-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private articlesService : ArticlesService, private titleService: Title, private metaService: Meta) { }
  
  article$ : Observable<any> = this.route.paramMap.pipe(
    delay(500),
    switchMap((params : any) => this.articlesService.getArticle(params.params.url))
  )
  
  ngOnInit(): void {
    this.article$.subscribe((article : any) => this.setMeta(article))
  }

  setMeta(article : any) {
    this.titleService.setTitle(article?.title.replace(/(^\w{1})|(\s+\w{1})/g, (letter : any) => letter.toUpperCase()) + " |  InfoHub");
    let description = article.text.replace(/<[^>]+>/gm, '')
    description = description.split(" ").length < 25 ? description.split(" ").slice(0, 25).join(" ") : description.split(" ").slice(0, 25).join(" ") + '...'
    this.metaService.updateTag({name: "description", content: description})
    this.metaService.updateTag({property: "oc:description", content: description})
    this.metaService.addTag({name: "article:published_time", content: article.date})
    this.metaService.addTag({property: "oc:image", content: article.imageUrl})
    this.metaService.addTag({name: "twitter:description", content: "description"})
    this.metaService.addTag({name: "twitter:image", content: article.imageUrl}) 
  }

}
