import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { UserService } from '../../shared/data-access/user.service';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private userService : UserService, private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.userService.getUserUpdateListener().pipe(
      filter((user) => user != null),
      map((user) => !!user),
    );
  }
  
}
