import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../core/components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../core/data-access/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService : UserService, private dialog : MatDialog) { }

  users$ : Observable<any> = this.userService.getUsers()

  ngOnInit(): void {
  }

  onUpdateUser(user : any) {
    this.userService.updateUser(user).subscribe()
  }

  onSetDefaultAvatar(id : number) {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent);
    confirmDialog.afterClosed().subscribe((res) => {
      if (res) this.userService.setDefaultAvatar(id).subscribe()
    })
  }

  onDelete(id : number) {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent);
    confirmDialog.afterClosed().subscribe((res) => {
      if (res) this.userService.deleteUser(id).subscribe(() => this.users$ = this.userService.getUsers())
    })
  }
}
