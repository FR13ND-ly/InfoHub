import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateSearchTextService {

  constructor() { }

  private searchTextUpdated = new Subject<string>();

  getSearchTextUpdateListener() : Observable<string> {
    return this.searchTextUpdated.asObservable()
  }

  setSearchText(text : string) : void {
    this.searchTextUpdated.next(text)
  }
}
