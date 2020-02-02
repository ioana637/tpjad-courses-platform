import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-share-news',
  templateUrl: './share-news.component.html',
  styleUrls: ['./share-news.component.scss']
})
export class ShareNewsComponent implements OnInit {
  form: FormGroup;
  @Input() display: boolean;
  @Input() courseId: number;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() messageEmitter = new EventEmitter<string>();
  subscriptions: Subscription[] = [];
  message: string;
  errorMessage: string;

  constructor(
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onClose() {
    this.displayChange.emit(false);
  }

  sendEmails() {
    if (this.message) {
      this.subscriptions.push(this.coursesService.sendMailToStudents({courseId: this.courseId, message: this.message})
      .subscribe((res) => {
        this.messageEmitter.emit('ok');
        this.onClose();
      }, (err) => {
        this.messageEmitter.emit(err.error.message);
      }))
    }
  }

}
