import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { AuthorizedGuard } from './core/guards/authorized.guard';
import { DesktopGuard } from './core/guards/desktop.guard';
import { DirtyArticleGuard } from './core/guards/dirty-article.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'articol/nou',
    loadChildren: () =>
      import('./article-editor/article-editor.module').then(
        (m) => m.ArticleEditorModule
      ),
    canActivate: [AuthorizedGuard, DesktopGuard],
    canDeactivate: [DirtyArticleGuard]
  },
  {
    path: 'articol/:url',
    loadChildren: () =>
      import('./article-details/article-details.module').then(
        (m) => m.ArticleDetailsModule
      ),
  },
  {
    path: 'articol/:url/edit',
    loadChildren: () =>
      import('./article-editor/article-editor.module').then(
        (m) => m.ArticleEditorModule
      ),
    canActivate: [AuthorizedGuard, DesktopGuard]
  },
  {
    path: 'ciorne',
    loadChildren: () =>
      import('./drafts/drafts.module').then((m) => m.DraftsModule),
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'widgets',
    loadChildren: () =>
      import('./widgets/widgets.module').then((m) => m.WidgetsModule),
    canActivate: [AuthorizedGuard, DesktopGuard]
  },
  {
    path: 'utilizatori',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthorizedGuard, DesktopGuard]
  },
  {
    path: 'readlist',
    loadChildren: () =>
      import('./read-lists/read-lists.module').then((m) => m.ReadListsModule),
      canActivate: [AuthenticatedGuard]
  },
  {
    path: '404',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
