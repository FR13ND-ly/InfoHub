import { Component, OnInit } from '@angular/core';
import { delay, filter, Observable, switchMap } from 'rxjs';
import { LoadingService } from 'src/app/shared/data-access/loading.service';
import { UserService } from 'src/app/shared/data-access/user.service';
import { ReadListsService } from '../read-lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  constructor(private readListsService : ReadListsService, private userService : UserService, private loadingService : LoadingService) { }

  lists$ : Observable<any> = this.userService.getUserUpdateListener().pipe(
    delay(500),
    filter((user : any) => user),
    switchMap((user : any) => this.readListsService.getReadLists(user.uid))
  )
  
  ngOnInit(): void {
    this.loadingService.setLoading(true)
    this.lists$.subscribe(() => this.loadingService.setLoading(false))
  }

}
