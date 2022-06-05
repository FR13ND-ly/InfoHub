import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchSidenavOpenService {

  constructor() { }

  private openUpdated = new Subject<boolean>();

  getOpenUpdateListener() : Observable<boolean> {
    return this.openUpdated.asObservable();
  }

  changeOpenSearchNav(open : boolean) : void {
    this.openUpdated.next(open);
  }
}
