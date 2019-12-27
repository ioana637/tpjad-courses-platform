import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private userService: UsersService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (!this.userService.isAuthenticatedProfessor()) {
      this.router.navigate(['home/courses']);
      return false;
    }
    return true;
  }
}
