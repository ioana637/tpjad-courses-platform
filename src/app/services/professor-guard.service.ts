import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorGuardService implements CanActivate {

  constructor(private userService: UsersService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (!this.userService.isAuthenticatedProfessor()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
