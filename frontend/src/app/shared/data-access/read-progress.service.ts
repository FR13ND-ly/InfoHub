import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadProgressService {

  constructor() { }

  private readProgressUpdated = new Subject<number>();

  getProgressListener() : Observable<number> {
    return this.readProgressUpdated.asObservable();
  }

  setProgress(progress : number) : void {
    this.readProgressUpdated.next(progress);
  }
}
