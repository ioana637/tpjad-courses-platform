import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../utils/structures';
import { UsersService } from '../services/users.service';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  model: User;
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private userService: UsersService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.model = {name: '', surname: '', password: '', email: ''};
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  register() {
    this.subscriptions.push(this.userService.register(this.model).subscribe(
      (user) => { this.router.navigate(['/login']) },
      (error) => {
        this.toastService.addError(error.message);
        console.log(error);
      }));
  }

}
