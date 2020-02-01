import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/utils/structures';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  course: Course;
  constructor() {
    this.course = {
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
      year: '2020'
    }
  }

  ngOnInit() {
  }

}
