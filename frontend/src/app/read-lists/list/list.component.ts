import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user.service';
import { ReadListsService } from '../read-lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private readListService: ReadListsService, private route: ActivatedRoute, private userService: UserService) { }
  
  id! : any

  icons : Array<string> = [
    "bookmark",
    "home",
    "search",
    "favorite",
    "add",
    "delete",
    "star",
    "bolt",
    "block",
    "settings_accesibility",
    "star_half",
    "token",
    "account_circle",
    "info",
    "schedule",
    "language",
    "task_alt",
    "event",
    "event_note",
    "light_bulb",
    "priority_high",
    "build",
    "all_inclusive",
    "notification_important",
    "collections_bookmark",
    "rule",
    "push_pin",
    "hourglass_full",
    "new_label",
    "gesture",
    "eco"
  ]
  
  listInfo$: Observable<any> = this.userService.getUserUpdateListener().pipe(
    switchMap((user) => this.route.params.pipe(
      first((params : any) => this. id = params.url),
      switchMap((params: any) => this.readListService.getReadListInfo({
          id: params.url == "istoric" ? -1 : params.url == "aprecieri" ? -2 : params.url,
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

  onChangeName(listInfo : any, newName: string) {
    let newListInfo : any = {...listInfo}
    newListInfo.name = newName
    this.onEdit(newListInfo)
  }

  onChangeAccess(listInfo : any) {
    listInfo.public = !listInfo.public
    this.onEdit(listInfo)
  }

  onCopyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  onDelete() {
    this.readListService.deleteReadList(this.id).subscribe()
  }

  onChangeIcon(listInfo : any, icon : string) : void {
    listInfo.icon = icon
    this.onEdit(listInfo)
  }

  onEdit(listInfo : any) {
    this.readListService.editReadList(listInfo, this.id).subscribe()
  }
}