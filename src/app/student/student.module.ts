import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStudentComponent } from './home-student/home-student.component';
import { StudentRoutingModule } from './student-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonsModule } from '../commons/commons.module';
import { MyCoursesStudentComponent } from './my-courses-student/my-courses-student.component';
import { AllCoursesStudentComponent } from './all-courses-student/all-courses-student.component';



@NgModule({
  declarations: [HomeStudentComponent, MyCoursesStudentComponent, AllCoursesStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SidebarModule,
    ButtonModule,
    CommonsModule
  ]
})
export class StudentModule { }
