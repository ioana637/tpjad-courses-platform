import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { ShareNewsComponent } from './share-news/share-news.component';
import { AddEditCourseComponent } from './add-edit-course/add-edit-course.component';




@NgModule({
  declarations: [
    AccountSettingsComponent, 
    CourseCardComponent, 
    ShareNewsComponent, 
    AddEditCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
  ],
  exports: [
    AccountSettingsComponent,
    CourseCardComponent,
    ShareNewsComponent,
    AddEditCourseComponent
  ]
})
export class CommonsModule { }
