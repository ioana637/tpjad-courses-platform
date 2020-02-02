import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-courses-student',
  templateUrl: './my-courses-student.component.html',
  styleUrls: ['./my-courses-student.component.scss']
})
export class MyCoursesStudentComponent implements OnInit, OnDestroy {

  courses: Course[];
  subscriptions: Subscription[] =[];
  constructor(private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.coursesService.fetchAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
      this.courses.forEach((course) => {
        this.subscriptions.push(this.coursesService.getNumberStudentsForCourse(course.id).subscribe(
          (res) => {
            // TODO 
            console.log(res);
          }
        ))
      });
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
