import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-professor',
  templateUrl: './home-professor.component.html',
  styleUrls: ['./home-professor.component.scss']
})
export class HomeProfessorComponent implements OnInit {

  constructor(private userService: UsersService, 
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.router.navigate(['/professor/courses']);
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
