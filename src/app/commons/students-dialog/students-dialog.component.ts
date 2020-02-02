import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/utils/structures';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent implements OnInit {

  @Input() courseId: number;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  subscriptions: Subscription[] = [];
  students: User[]=[];

  constructor(private toastService: ToastService,
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.coursesService.getStudentsForCourse(this.courseId).subscribe((data: User[]) => {
      this.students = data;
    }));
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onClose() {
    this.displayChange.emit(false);
  }

}
