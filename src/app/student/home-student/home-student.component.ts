import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-student',
  templateUrl: './home-student.component.html',
  styleUrls: ['./home-student.component.scss']
})
export class HomeStudentComponent implements OnInit {

  constructor(private userService: UsersService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout().subscribe((res) => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log(error);
      this.toastService.addError(error.error.message);
    })
  }

}
