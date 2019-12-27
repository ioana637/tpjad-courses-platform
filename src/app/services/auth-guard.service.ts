import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UsersService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
