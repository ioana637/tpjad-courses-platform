import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/utils/structures';
import { FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  previewURL: any = '../../../assets/user_blue_logo.png';
  currentUser: User;
  form: FormGroup;

  constructor(private userService: UsersService, private toastService: ToastService) { }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser.picture) {
      this.preview();
    }
  }

  onFileChanged(event) {
    this.currentUser.picture = <File>event.target.files[0];
    this.preview();
  }

  preview() {
    // Show preview 
    console.log(this.currentUser.picture);
    const mimeType = this.currentUser.picture.type;
    if ((mimeType && mimeType.match(/image\/*/) == null) || !mimeType) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.currentUser.picture);
    reader.onload = (_event) => {
      this.previewURL = reader.result;
    }
  }

  saveSettings() {
    console.log(this.currentUser);
    this.userService.setAccountSettings(this.currentUser).subscribe((res) => {
      console.log(res);
      this.toastService.addSuccess('Changes successfully saved!');
    }, (err) => {
      console.log(err);
      this.toastService.addError('');
    })
  }


}
