import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {
  }

  addInfo(msg: string) {
    this.messageService.add({severity: 'info', summary: 'Info', closable: true, detail: msg, life: 3000, sticky: false});
  }

  addWarning(msg: string) {
    this.messageService.add({severity: 'warning', summary: 'Warning', closable: true, detail: msg, life: 3000, sticky: false});
  }

  addError(msg: string) {
    this.messageService.add({severity: 'error', summary: 'Error', closable: true, detail: msg, life: 3000, sticky: false});
  }

  addSuccess(msg: string) {
    this.messageService.add({severity: 'success', summary: 'Success', closable: true, detail: msg, life: 3000, sticky: false});
  }
}
