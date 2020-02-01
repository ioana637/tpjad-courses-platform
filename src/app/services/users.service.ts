import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Role, User } from '../utils/structures';
import { userLogin, userRegister, userSaveAccountSettings, userLogout } from './urls';

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
      .pipe(map((response: {session_id: string, user: User}) => {
        this.setCurrentUserInLocalStorage(response);
        return response.user;
      }));
  }

  register(user:User) {
    return this.http.post(userRegister, JSON.stringify(user), {headers: this.httpHeaders});
  }

  private setCurrentUserInLocalStorage(obj: {session_id: string, user: User}) {
    localStorage.setItem('currentUser', JSON.stringify(obj));
  }

  logout() {
    localStorage.removeItem('currentUser');
    return this.http.get(userLogout, {headers: this.httpHeaders});
    // TODO: logout de la server
  }


  getCurrentUser(): User {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj) {
      return obj.user;
    }
    return undefined;
  }

  setAccountSettings(user: User) {
    const parameters = new HttpParams();
    parameters.append('name', user.name);
    parameters.append('surname', user.surname);
    parameters.append('password', user.password);
    parameters.append('newPassword', user.newPassword);
    parameters.append('rewrittenPassword', user.rewritePassword);
    const formData = new FormData();
    formData.append('file', user.picture);

    return this.http.put(userSaveAccountSettings, formData, {headers: this.httpHeaders, params: parameters});
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    if (user) {
      return true;
    } else return false;
  }

  isAuthenticatedProfessor(): boolean {
    const user = this.getCurrentUser();
    if (user && user.role === 'PROFESSOR') {
      return true;
    }
    return false;
  }

  isAuthenticatedStudent(): boolean {
    const user = this.getCurrentUser();
    if (user && user.role === 'STUDENT') {
      return true;
    }
    return false;
  }
}
