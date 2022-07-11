import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delay, Observable, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../core/components/confirm-dialog/confirm-dialog.component';
import { ArticleEdit } from '../core/models/article/article.edit.model';
import { Article } from '../core/models/article/article.model';
import { ArticlesService } from '../core/data-access/articles.service';
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
    private store: Store<{ loading: boolean }>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  article$: Observable<ArticleEdit> = this.route.paramMap.pipe(
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
    if (!article.title.trim()) {
      this.snackBar.open("Titlul este obligatoriu", "", {duration: 3000});
      return
    }
    if (!article.text.trim()) {
      this.snackBar.open("Text-ul este obligatoriu", "", {duration: 3000});
      return
    }
    if (!article.image) {
      this.snackBar.open("Imaginea de copertă e obligatorie", "", {duration: 3000});
      return
    }
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

  onDelete(url: string) {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent);
    confirmDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.articleService.deleteArticle(url).subscribe(() => this.router.navigate(['/']))
      }
    })
  }
}
