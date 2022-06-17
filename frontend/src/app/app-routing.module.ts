import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: "", component : LandingPageComponent},
  {path: "articol/nou", loadChildren: () => import('./article-editor/article-editor.module').then(m => m.ArticleEditorModule)},
  {path: "articol/:url", loadChildren: () => import('./article-details/article-details.module').then(m => m.ArticleDetailsModule)},
  {path: "articol/:url/edit", loadChildren: () => import('./article-editor/article-editor.module').then(m => m.ArticleEditorModule)},
  {path: "ciorne", loadChildren: () => import('./drafts/drafts.module').then(m => m.DraftsModule)},
  {path: "widgets", loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)},
  {path: "utilizatori", loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  {path: "readlist", loadChildren: () => import('./read-lists/read-lists.module').then(m => m.ReadListsModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
