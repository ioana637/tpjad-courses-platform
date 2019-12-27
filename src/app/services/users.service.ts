import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { User } from '../utils/structures';
import { loginUserUrl } from './urls';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  login(user: User) {
    return this.http.post(loginUserUrl, JSON.stringify(user), { headers: this.httpHeaders })
      .pipe(map((obj: User) => {
        this.setCurrentUserInLocalStorage(obj);
        return obj;
      }));
  }

  private setCurrentUserInLocalStorage(obj: User) {
    localStorage.setItem('currentUser', JSON.stringify({
      _id: obj._id,
      token: obj.token,
      username: obj.username,
      role: obj.role,
      name: obj.name,
      password: obj.password,
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    // TODO: logout de la server
  }

  getCurrentUsername(): string {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj && obj.username) {
      return obj.username;
    }
    return undefined;
  }

  getCurrentIsAdmin(): string {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj && obj.role) {
      return obj.role;
    }
    return undefined;
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
    if (user && !this.jwtHelper.isTokenExpired(user.token)) {
      return true;
    } else return false;
  }

  isAuthenticatedProfessor(): boolean {
    const user = this.getCurrentUser();
    if (user && !this.jwtHelper.isTokenExpired(user.token) && user.role === 'professor') {
      return true;
    }
    return false;
  }
}
