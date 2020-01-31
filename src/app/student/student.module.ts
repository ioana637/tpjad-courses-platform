import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStudentComponent } from './home-student/home-student.component';
import { StudentRoutingModule } from './student-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [HomeStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SidebarModule,
    ButtonModule
  ]
})
export class StudentModule { }
