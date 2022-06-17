import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticlesService } from 'src/app/shared/data-access/articles.service';
import { SearchSidenavOpenService } from 'src/app/shared/data-access/search-sidenav-open.service';
import { UpdateSearchTextService } from 'src/app/shared/data-access/update-search-text.service';

@Component({
  selector: 'app-editorial-articles',
  templateUrl: './editorial-articles.component.html',
  styleUrls: ['./editorial-articles.component.scss']
})
export class EditorialArticlesComponent implements OnInit {

  constructor(private elRef: ElementRef, private searchSidenavOpenService : SearchSidenavOpenService, private updateSearchTextService : UpdateSearchTextService, private articlesService : ArticlesService) { }

  editorials$ : Observable<any> = this.articlesService.getArticlesByCategory('opiniieditorial')

  ngOnInit(): void {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry : IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          (<HTMLElement[]>Array.from(entry.target.children)).forEach((editorial : HTMLElement) => {
            editorial.classList.add('show')
          });
          observer.unobserve(entry.target)
        }
      })
    }, {threshold : .3})
    observer.observe(this.elRef.nativeElement)
  }

  onOpenSearchSideNav() {
    this.searchSidenavOpenService.changeOpenSearchNav(true)
    this.updateSearchTextService.setSearchText('#opiniieditorial')
  }
}
