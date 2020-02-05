import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit, OnDestroy {

  @Input() course: Course;
  @Output() messageToShow = new EventEmitter<any>();
  subscriptions: Subscription[] = [];
  display = false;
  constructor(private router: Router,
    private courseService: CoursesService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  shareNews() {
    this.display = true;
  }

  emailsWereSent() {
  }

  editCourse() {
    this.router.navigate([`professor/courses/${this.course.id}`]);
  }

  showMessage(message) {
    if (message === 'ok') {
      this.messageToShow.emit({ type: 'success', message: 'Emails sent successfully' });
    } else if (message = 'delete') {
      this.messageToShow.emit({ type: 'success', message: 'Course deleted successfully' });
    } else {
      this.messageToShow.emit({ message, type: 'error' });
    }
  }

  deleteCourse() {
    this.subscriptions.push(this.courseService.deleteCourseById(this.course.id).subscribe((res) => {
      this.showMessage('delete');
    }, (err) => {
      this.showMessage(err.error.message);
      console.log(err);
    }))
  }
}
