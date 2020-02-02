import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/utils/structures';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  courseId: number;
  course: Course;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.courseId);
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
      year: '2020',
      users: [
        {
          name: 'Ana',
          surname: 'Maria',
          email: 'ana@cs.ubbcluj.ro',
          role: 'PROFESSOR'
        }
      ]
    }
    this.course.professor = this.course.users.filter((user) => user.role === 'PROFESSOR')[0];
  }



}
