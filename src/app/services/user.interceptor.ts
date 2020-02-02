import {Injectable} from '@angular/core';
import {UsersService} from './users.service';
import {Observable} from 'rxjs';
import {HttpEvent, HttpRequest, HttpInterceptor, HttpHandler} from '@angular/common/http';


@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(public auth: UsersService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const obj = JSON.parse(localStorage.getItem('currentUser'));
    if (obj && obj.email && obj.password) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${btoa(`${obj.email}:${obj.password}`)}`
        }
      });
    }
    return next.handle(request);
  }
}
