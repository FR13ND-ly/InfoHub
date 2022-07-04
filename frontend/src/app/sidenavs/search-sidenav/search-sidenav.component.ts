import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, filter, map, Observable, Subject, switchMap } from 'rxjs';
import { setSearchSidenavOpen } from 'src/app/state/search-sidenav/search-sidenav.actions';
import { SearchService } from './data-access/search.service';
import { FormControl } from '@angular/forms';
import { ArticlePreview } from 'src/app/core/models/article/article.preview.model';

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

  searchText: string = "";
  
  searchText$: Subject<string> = new Subject<string>()
  articles$: Observable<ArticlePreview[]> = this.searchText$.pipe(
    debounceTime(500),
    switchMap((text : string) => this.searchService.search(text))
  );

  ngOnInit(): void {
    this.store.select('searchSidenav')
      .pipe(
        map((res) => res.text)
      )
      .subscribe((text: string) => {
        this.searchText = text
        this.searchText$.next(text);
      });
  }

  onInput() {
    this.searchText$.next(this.searchText)
  }

  onCloseSearchSidenav() {
    this.store.dispatch(setSearchSidenavOpen({ state: false }));
  }
}
