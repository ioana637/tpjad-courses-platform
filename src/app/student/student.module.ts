import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStudentComponent } from './home-student/home-student.component';
import { StudentRoutingModule } from './student-routing.module';



@NgModule({
  declarations: [HomeStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
