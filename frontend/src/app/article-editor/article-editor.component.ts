import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, Observable, switchMap } from 'rxjs';
import { ArticlesService } from '../shared/data-access/articles.service';
import { setLoading } from '../state/loading/loading.actions';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
    private store: Store<{ loading: boolean }>
  ) {}

  article$: Observable<any> = this.route.paramMap.pipe(
    delay(500),
    switchMap((params: Params) =>
      this.articleService.getArticleToEdit(params['params'].url)
    )
  );

  ngOnInit(): void {
    this.store.dispatch(setLoading({state : true}))
    this.article$.subscribe(() => this.store.dispatch(setLoading({state : false})));
  }

  onPublish(article: any) {
    this.store.dispatch(setLoading({state : true}))
    let textEditor = document.getElementById('text-editor')
    let articleToPush : any = {...article}
    if (textEditor?.classList.contains('code-view')) {
      articleToPush.text = textEditor.innerText
    }
    this.articleService.editArticle(articleToPush).subscribe((res: any) => {
      this.store.dispatch(setLoading({state : false}))
      article.framework = false;
      article.url = res;
    });
  }

  onDelete(url: any) {
    if (!confirm("Sunteți sigur?")) return
    this.articleService.deleteArticle(url).subscribe(() => this.router.navigate(['/']))
  }
}
