import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../shared/data-access/articles.service';
import { UserService } from '../shared/data-access/user.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  constructor(private articlesService : ArticlesService, private userService : UserService, private router : Router) { }
  
  articles = []
  
  user : any = false

  ngOnInit(): void { 
    this.userService.getUserUpdateListener().subscribe((user) => {
      if (!user?.isStaff) {
        this.router.navigate(['/']);
      }
      this.articlesService.getDrafts()
      .subscribe((res : any) => this.articles = res)
    })
    
  }

}
