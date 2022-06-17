import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../shared/data-access/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userService : UserService) { }

  users$ : Observable<any> = this.userService.getUsers()

  ngOnInit(): void {
  }

  onUpdateUser(user : any) {
    this.userService.updateUser(user).subscribe()
  }

  onSetDefaultAvatar(id : number) {
    this.userService.setDefaultAvatar(id).subscribe()
  }
}
