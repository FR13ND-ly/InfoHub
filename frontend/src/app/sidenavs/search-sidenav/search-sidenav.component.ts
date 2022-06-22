import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSearchSidenavOpen } from 'src/app/state/search-sidenav/search-sidenav.actions';
import { SearchService } from './data-access/search.service';

@Component({
  selector: 'app-search-sidenav',
  templateUrl: './search-sidenav.component.html',
  styleUrls: ['./search-sidenav.component.scss'],
})
export class SearchSidenavComponent implements OnInit {
  constructor(
    private searchService: SearchService,
    private store: Store<any>
  ) {}

  searchText: string = '';

  articles!: any[];
  loading: boolean = false;

  ngOnInit(): void {
    this.store.select('searchSidenav')
      .subscribe((res: any) => {
        this.searchText = res.text;
        this.onSearch(this.searchText);
      });
  }

  onSearch(text: string) {
    if (text.trim()) {
      this.loading = true;
      this.searchService.search(text).subscribe((res: any) => {
        this.articles = res;
        this.loading = false;
      });
    } else {
      this.articles = [];
    }
  }

  onCloseSearchSidenav() {
    this.searchText = '';
    this.articles = [];
    this.store.dispatch(setSearchSidenavOpen({ state: false }));
  }
}
