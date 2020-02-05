import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Course, User } from 'src/app/utils/structures';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-course-card-student',
  templateUrl: './course-card-student.component.html',
  styleUrls: ['./course-card-student.component.scss']
})
export class CourseCardStudentComponent implements OnInit, OnDestroy {
  @Input() course: Course;
  @Input() viewMode: boolean;
  @Output() enrolledDone = new EventEmitter();
  currentUser: User;
  subscriptions: Subscription[]=[];
  display = false;
  enrolled = false;
  constructor(private router: Router,
    private toastService: ToastService,
    private usersService: UsersService,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.currentUser = this.usersService.getCurrentUser();
    this.course.professor = this.course.users.filter((user) => user.role === 'PROFESSOR')[0];
    if (this.course.users.filter((user) => user.email === this.currentUser.email).length > 0){
      this.enrolled = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  enrollInCourse() {
    this.subscriptions.push(this.coursesService.enrollToCourse(this.course.id).subscribe(
      (res) => {
        this.toastService.addSuccess('You were enrolled');
        this.enrolledDone.emit(true);
      },
      (err) => {
        this.toastService.addError(err.error.message);
      }
    ))
  }

  viewCourse(){
    this.router.navigate([`/student/my-courses/${this.course.id}`]);
  }
}
