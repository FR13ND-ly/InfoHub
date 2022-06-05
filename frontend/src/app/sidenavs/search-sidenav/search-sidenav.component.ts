import { Component, OnInit } from '@angular/core';
import { SearchSidenavOpenService } from 'src/app/shared/data-access/search-sidenav-open.service';
import { UpdateSearchTextService } from 'src/app/shared/data-access/update-search-text.service';
import { SearchService } from './data-access/search.service';

@Component({
  selector: 'app-search-sidenav',
  templateUrl: './search-sidenav.component.html',
  styleUrls: ['./search-sidenav.component.scss']
})
export class SearchSidenavComponent implements OnInit {

  constructor(private searchSideNavOpenService : SearchSidenavOpenService, private updateSearchTextService : UpdateSearchTextService, private searchService : SearchService) { }

  searchText : string = ''

  articles! : any[]

  ngOnInit(): void {
    this.updateSearchTextService.getSearchTextUpdateListener()
    .subscribe((text : string) => {
      this.searchText = text
      this.onSearch(this.searchText)
    })
  }

  onSearch(text : string) {
    if (text.trim()) {
      this.searchService.search(text)
      .subscribe((res : any)=> this.articles = res)
    }
    else {
      this.articles = []
    }
  }

  onCloseSearchSidenav() {
    this.searchText = ''
    this.articles = []
    this.searchSideNavOpenService.changeOpenSearchNav(false)
  }
}
