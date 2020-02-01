import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  display = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  shareNews() {
    this.display = true;
    console.log('share news');
  }

  emailsWereSent() {
    console.log('close sending emails');
  }

  editCourse(){
    this.router.navigate([`professor/courses/${this.course.id}`]); 
  }
}
