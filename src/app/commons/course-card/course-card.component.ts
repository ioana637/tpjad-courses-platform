import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  @Output() messageToShow = new EventEmitter<any>();
  display = false;
  constructor(private router: Router,
    ) { }

  ngOnInit() {
  }

  shareNews() {
    this.display = true;
  }

  emailsWereSent() {
  }

  editCourse(){
    this.router.navigate([`professor/courses/${this.course.id}`]); 
  }

  showMessage(message) {
    if (message === 'ok'){
      this.messageToShow.emit({type: 'success', message:'Emails sent successfully'});
    } else {
      this.messageToShow.emit({message, type: 'error'});
    }
  }
}
