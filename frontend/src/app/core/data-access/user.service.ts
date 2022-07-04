import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signOut, signInWithRedirect, signInWithPopup } from "firebase/auth";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userUpdated = new BehaviorSubject<any>(null)
  readonly APIUrl = environment.apiUrl + 'user/'

  provider = new GoogleAuthProvider();
  private auth = getAuth()

  login() {
    signInWithPopup(this.auth, this.provider)
    .then((result : any) => {
      console.log('a')
      this.http.post(this.APIUrl + 'login/', result.user).subscribe((res) => {
        if (result.user) this.userUpdated.next({...result.user, ...res})
        else this.userUpdated.next(false)
      })
      
    });
  }

  initiliaze() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.http.get(`${this.APIUrl}authorization/${user?.uid}/`).subscribe(res => {
          this.userUpdated.next({...user, ...res})
        })
      }
      else this.userUpdated.next(false)
    })
    return this.auth.currentUser
  }

  getUserUpdateListener() : Observable<User> {
    return this.userUpdated.asObservable()
  }

  logout() {
    signOut(this.auth)
    this.userUpdated.next(false)
  }

  setUserImage(data : any) {
    return new Observable((observer) => this.http.post(`${this.APIUrl}set-user-image/${data.token}/`, data.file).subscribe(() => {
      this.http.get(`${this.APIUrl}authorization/${this.auth.currentUser?.uid}/`).subscribe(res => {
        this.userUpdated.next({...this.auth.currentUser, ...res})
        observer.next()
      })
    })
    )
  }

  getUsers() {
    return this.http.get(`${this.APIUrl}all/`)
  }

  updateUser(data : any) {
    return this.http.put(`${this.APIUrl}update/`, data)
  }

  setDefaultAvatar(id : number) {
    return this.http.get(`${this.APIUrl}default-avatar/${id}/`)
  }

  deleteUser(id : number) {
    return this.http.delete(`${this.APIUrl}delete/${id}/`)
  }
}
