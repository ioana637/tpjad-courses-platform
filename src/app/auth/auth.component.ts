import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import { UsersService } from '../services/users.service';
import { ToastService } from '../services/toast.service';
import { User, Role } from '../utils/structures';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  model: User = {email: '', password: ''};
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private userService: UsersService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  login() {
    this.subscriptions.push(this.userService.login(this.model).subscribe(
      (obj: User) => {
        if (obj.role === 'STUDENT') {
          this.router.navigate(['/student']);
        } else if (obj.role === 'PROFESSOR') {
          this.router.navigate(['/professor']);
        }
      },
      (error) => {
        this.toastService.addError(error.error.message);
        console.log(error);
      }
    ));
  }

}
