import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user.service';
import { ReadListsService } from '../read-lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private readListService: ReadListsService, private route: ActivatedRoute, private userService: UserService) { }

  listInfo$: Observable<any> = this.userService.getUserUpdateListener().pipe(
    switchMap((user) => this.route.paramMap.pipe(
      switchMap((params: any) => this.readListService.getReadListInfo({
          id: params.params.url == "istoric" ? -1 : params.params.url == "aprecieri" ? -2 : params.params.url,
          user: user.uid
        })
      ))
    )
  )

  articles$ : Observable<any> = this.userService.getUserUpdateListener().pipe(
    switchMap((user) => this.route.paramMap.pipe(
      switchMap((params: any) => this.readListService.getReadListArticles({
          id: params.params.url == "istoric" ? -1 : params.params.url == "aprecieri" ? -2 : params.params.url,
          user: user.uid
        })
      ))
    )
  )

  ngOnInit(): void {
  }

  onChangeName(newName: string) {
  }

  onChangeAccess() {
    // this.listInfo.public = !this.listInfo.public
  }

  onCopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  onDelete() {

  }

}
