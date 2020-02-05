import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-all-courses-student',
  templateUrl: './all-courses-student.component.html',
  styleUrls: ['./all-courses-student.component.scss']
})
export class AllCoursesStudentComponent implements OnInit, OnDestroy {
  courses: Course[];
  filterText: string;
  subscriptions: Subscription[] = [];

  constructor(private coursesService: CoursesService,
    private toastService: ToastService) {
  }

  ngOnInit() {
    this.fetchAllCourses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  fetchAllCourses() {
    this.subscriptions.push(this.coursesService.fetchAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
      this.courses.forEach((course) => {
        this.subscriptions.push(this.coursesService.getNumberStudentsForCourse(course.id).subscribe(
          (res: { studentsNumber: number }) => {
            const id = this.courses.findIndex((c) => c.id === course.id);
            this.courses[id].studentsSignedIn = res.studentsNumber;
          },
          (err) => {
            this.toastService.addError(err.error.message);
            console.log(err);
          }
        ))
      });
    }, (err) => {
      this.toastService.addError(err.error.message);
      console.log(err);
    }))
  }

  fetchCourses(event) {
    if (this.filterText && this.filterText.length > 0){
      this.filter();
    } else {
      this.fetchAllCourses();
    }
  }

  filter() {
    this.subscriptions.push(this.coursesService.filterCourses(this.filterText).subscribe((res: Course[]) => {
      this.courses = res;
    }, (err) => {
      this.toastService.addError(err.error.message);
      console.log(err);
    }));
  }

  reset() {
    this.filterText = '';
    this.fetchAllCourses();
  }
}
