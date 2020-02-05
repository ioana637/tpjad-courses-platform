import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { ToastService } from 'src/app/services/toast.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[];
  subscription: Subscription[] = [];
  constructor(private toastService: ToastService,
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.fetchCourses();
  }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  fetchCourses() {
    this.subscription.push(
      this.coursesService.getMyCourses().subscribe((data: Course[]) => {
        this.courses = data;
        this.courses.forEach((course) => {
          this.subscription.push(this.coursesService.getNumberStudentsForCourse(course.id).subscribe(
            (res: { studentsNumber: number }) => {
              const id = this.courses.findIndex((c) => c.id === course.id);
              this.courses[id].studentsSignedIn = res.studentsNumber;
            }
          ))
        });

      }));
  }

  messageReceived(msg) {
    switch (msg.type) {
      case 'error': {
        this.toastService.addError(msg.message);
        break;
      }
      case 'info': {
        this.toastService.addInfo(msg.message);
        break;
      }
      case 'success': {
        this.toastService.addSuccess(msg.message);
        if (msg.message.indexOf('Course deleted') > -1) {
          this.fetchCourses()
        }
        break;
      }
      case 'warning': {
        this.toastService.addWarning(msg.message);
        break;
      }
      default: {
        this.toastService.addInfo(msg.message);
        break;
      }
    }
  }

}
