import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Role, User } from '../utils/structures';
import { userLogin, userRegister } from './urls';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Access-Control-Allow-Origin': '*'
    });
  }

  login(user: User) {
    return this.http.post(userLogin, JSON.stringify(user), {headers: this.httpHeaders})
      .pipe(map((user: User) => {
        this.setCurrentUserInLocalStorage(user);
        return user;
      }));
  }

  register(user:User) {
    return this.http.post(userRegister, JSON.stringify(user), {headers: this.httpHeaders});
  }

  private setCurrentUserInLocalStorage(obj: User) {
    localStorage.setItem('currentUser', JSON.stringify(obj));
  }

  logout() {
    localStorage.removeItem('currentUser');
    // TODO: logout de la server
  }


  getCurrentUser(): User {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj) {
      return obj;
    }
    return undefined;
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    if (user) {
      return true;
    } else return false;
  }

  isAuthenticatedProfessor(): boolean {
    const user = this.getCurrentUser();
    if (user && user.role === Role.PROFESSOR) {
      return true;
    }
    return false;
  }

  isAuthenticatedStudent(): boolean {
    const user = this.getCurrentUser();
    if (user && user.role === Role.STUDENT) {
      return true;
    }
    return false;
  }
}
