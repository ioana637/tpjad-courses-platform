import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { HomeProfessorComponent } from './home-professor/home-professor.component';



@NgModule({
  declarations: [CoursesComponent, HomeProfessorComponent],
  imports: [
    CommonModule,
    ProfessorRoutingModule
  ]
})
export class ProfessorModule { }
