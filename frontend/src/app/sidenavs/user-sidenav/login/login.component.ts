import { Component } from '@angular/core';
import { UserService } from 'src/app/core/data-access/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private userService : UserService) { }

  onLogin() {
    this.userService.login()
  }

}
