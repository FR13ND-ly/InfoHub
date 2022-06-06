import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user.service';
import { ReadListsService } from '../read-lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  constructor(private readListsService : ReadListsService, private userService : UserService) { }

  lists$ : Observable<any> = this.userService.getUserUpdateListener().pipe(
    switchMap((user : any) => this.readListsService.getReadLists(user.uid))
  )
  
  ngOnInit(): void {
  }

}
