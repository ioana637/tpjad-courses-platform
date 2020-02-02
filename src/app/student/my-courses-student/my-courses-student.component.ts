import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/utils/structures';

@Component({
  selector: 'app-my-courses-student',
  templateUrl: './my-courses-student.component.html',
  styleUrls: ['./my-courses-student.component.scss']
})
export class MyCoursesStudentComponent implements OnInit {

  courses: Course[];
  constructor() {
    this.courses = [{
      description: 'Description',
      id: 37,
      lectures: [
        {
          courseId: 37,
          date: new Date(),
          filename: 'l1.pdf',
          id: 15,
          title: 'Lecture 1'
        },
        {
          courseId: 37,
          date: new Date(),
          filename: 'l2.pdf',
          id: 16,
          title: 'Lecture 2'
        },
      ],
      maxStudents: 100,
      studentsSignedIn: 37,
      title: 'Title',
      year: '2020',
      users: [
        {
          role: 'PROFESSOR',
          name: 'Andres',
          surname: 'Pop',
          email: 'a@cs.ubbcluj.ro'
        }
      ]
    }];
  }

  ngOnInit() {
  }

}
