import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material.module';
import { ArticlesByCategoryComponent } from './landing-page/articles-by-category/articles-by-category.component';
import { ArticlesListComponent } from './landing-page/articles-list/articles-list.component';
import { RightSidebarComponent } from './landing-page/right-sidebar/right-sidebar.component';
import { ArticlesSliderComponent } from './landing-page/feature-articles/articles-slider/articles-slider.component';
import { SecondaryArticlesComponent } from './landing-page/feature-articles/secondary-articles/secondary-articles.component';
import { EditorialArticlesComponent } from './landing-page/editorial-articles/editorial-articles.component';
import { FilesDialogComponent } from './files-dialog/files-dialog.component';
import { UserSidenavComponent } from './sidenavs/user-sidenav/user-sidenav.component';
import { LoginComponent } from './sidenavs/user-sidenav/login/login.component';
import { UserViewComponent } from './sidenavs/user-sidenav/user-view/user-view.component';
import { FormsModule } from '@angular/forms';
import { SearchSidenavComponent } from './sidenavs/search-sidenav/search-sidenav.component';
import { ArticleModule } from './core/components/article/article.module';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './landing-page/weather/weather.component';
import { StoreModule } from '@ngrx/store';
import { CurrencyComponent } from './landing-page/currency/currency.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { appState } from './state/app.state';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    ArticlesByCategoryComponent,
    ArticlesListComponent,
    RightSidebarComponent,
    ArticlesSliderComponent,
    SecondaryArticlesComponent,
    EditorialArticlesComponent,
    FilesDialogComponent,
    UserSidenavComponent,
    LoginComponent,
    UserViewComponent,
    SearchSidenavComponent,
    WeatherComponent,
    CurrencyComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ArticleModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appState),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
