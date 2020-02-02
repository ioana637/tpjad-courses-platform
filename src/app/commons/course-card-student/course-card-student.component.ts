import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card-student',
  templateUrl: './course-card-student.component.html',
  styleUrls: ['./course-card-student.component.scss']
})
export class CourseCardStudentComponent implements OnInit {
  @Input() course: Course;
  @Input() viewMode: boolean;
  display = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.course.professor = this.course.users.filter((user) => user.role === 'PROFESSOR')[0];
  }

  enrollInCourse() {
    console.log('Enroll in course');
  }

  viewCourse(){
    this.router.navigate([`/student/my-courses/${this.course.id}`]);
  }


}
