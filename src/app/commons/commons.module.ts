import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { AccountSettingsComponent } from './account-settings/account-settings.component';



@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    AccountSettingsComponent
  ]
})
export class CommonsModule { }
