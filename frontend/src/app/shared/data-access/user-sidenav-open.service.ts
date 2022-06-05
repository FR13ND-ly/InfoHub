import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSidenavOpenService {

  constructor() { }

  private openUpdated = new Subject<boolean>();

  getOpenUpdateListener() : Observable<boolean> {
    return this.openUpdated.asObservable();
  }

  changeOpenUserNav(open : boolean) : void {
    this.openUpdated.next(open);
  }
}
