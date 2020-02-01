import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/utils/structures';

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

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    // TODO request for students based on courseId
    this.students = [
      {
        name: 'name1',
        surname: 'surname1',
        email: 'email1'
      },
      {
        name: 'name2',
        surname: 'surname2',
        email: 'email2'
      },
      {
        name: 'name3',
        surname: 'surname3',
        email: 'email3'
      }
    ]
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onClose() {
    this.displayChange.emit(false);
  }

}
