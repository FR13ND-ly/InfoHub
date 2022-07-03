import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsComponent } from './article-details.component';
import { CommentsComponent } from './comments/comments.component';
import { MoreArticlesComponent } from './more-articles/more-articles.component';
import { SurveyComponent } from './survey/survey.component';
import { ArticleDetailsRoutingModule } from './article-details-routing.module';
import { ArticleComponent } from './article/article.component';
import { TagsComponent } from './article/tags/tags.component';
import { CoverImageComponent } from './article/cover-image/cover-image.component';
import { TitlesComponent } from './article/titles/titles.component';
import { TextComponent } from './article/text/text.component';
import { DetailsComponent } from './article/details/details.component';
import { MaterialModule } from '../material.module';
import { MenuComponent } from './menu/menu.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { FormsModule } from '@angular/forms';
import { TimeForReadModule } from '../core/pipes/time-for-read/time-for-read.module';


@NgModule({
  declarations: [
    ArticleDetailsComponent,
    CommentsComponent,
    MoreArticlesComponent,
    SurveyComponent,
    ArticleComponent,
    TagsComponent,
    CoverImageComponent,
    TitlesComponent,
    TextComponent,
    DetailsComponent,
    MenuComponent,
    NavigatorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ArticleDetailsRoutingModule,
    TimeForReadModule
  ]
})
export class ArticleDetailsModule { }
