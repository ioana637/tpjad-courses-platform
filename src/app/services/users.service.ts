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
      // 'Accept': '*/*',
      // 'Access-Control-Allow-Origin': '*',
    });
  }

  login(user: User) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${user.email}:${user.password}`)}`
    });
    return this.http.post(userLogin, null, { headers: this.httpHeaders })
      .pipe(map((response: User) => {
        this.setCurrentUserInLocalStorage(response);
        return response;
      }));
  }

  register(user: User) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(userRegister, JSON.stringify(user), { headers: this.httpHeaders });
  }

  private setCurrentUserInLocalStorage(obj: User) {
    localStorage.setItem('currentUser', JSON.stringify(obj));
  }

  logout() {
    return this.http.get(userLogout, { headers: this.httpHeaders }).pipe(
      map((resp) => {
        this.removeUserFromLocalStorage();
        return resp;
      })
    );
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('currentUser');
  }


  getCurrentUser(): User {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj) {
      return obj;
    }
    return undefined;
  }

  setAccountSettings(user: User) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'multipart/form-data; boundary=---------------------------293582696224464',
      'Accept': '*/*'
    });

    // const parameters = new HttpParams();
    // parameters.append('name', user.name);
    // parameters.append('email', user.email);
    // parameters.append('surname', user.surname);
    // parameters.append('password', user.password);
    // parameters.append('newPassword', user.newPassword);
    // parameters.append('rewrittenPassword', user.rewritePassword);
    
    const formData = new FormData();
    formData.append('file', user.picture);

    const url = this.compondUrlForSaveAccountSettings(user, userSaveAccountSettings);

    return this.http.put(url, formData, { headers: this.httpHeaders, withCredentials: true });
  }
  compondUrlForSaveAccountSettings(user: User, userSaveAccountSettings: string) {
    let result = `${userSaveAccountSettings}`;
    result = `${result}?email=${encodeURIComponent(user.email)}&name=${encodeURIComponent(user.name)}&surname=${encodeURIComponent(user.surname)}&password=${encodeURIComponent(user.password)}`;
    if (user.newPassword && user.newPassword!=='') {
      result = `${result}&newPassword=${encodeURIComponent(user.newPassword)}`;
    }
    if (user.rewritePassword && user.rewritePassword!=='') {
      result = `${result}&rewrittenPassword=${encodeURIComponent(user.rewritePassword)}`;
    }
    return result;
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
