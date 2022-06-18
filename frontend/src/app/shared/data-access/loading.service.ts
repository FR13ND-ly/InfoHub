import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private loadingUpdated = new Subject<boolean>();

  getLoadingListener() : Observable<boolean> {
    return this.loadingUpdated.asObservable();
  }

  setLoading(open : boolean) : void {
    this.loadingUpdated.next(open);
  }
}
