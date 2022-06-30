import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { ArticleComponent } from '../../article-details/article/article.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DirtyArticleGuard implements CanDeactivate<unknown> {

  constructor(public dialog: MatDialog) {}

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let confirmDialog = this.dialog.open(ConfirmDialogComponent);
      return confirmDialog.afterClosed()
  
  }
  
}
