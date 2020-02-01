import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-share-news',
  templateUrl: './share-news.component.html',
  styleUrls: ['./share-news.component.scss']
})
export class ShareNewsComponent implements OnInit {
  form: FormGroup;
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  subscriptions: Subscription[] = [];
  message: string;
  errorMessage: string;

  constructor(private toastService: ToastService) {
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
    console.log(this.message);
    if (this.message) {
      this.toastService.addSuccess('Emails sent succesfully');
    }
  }

}
