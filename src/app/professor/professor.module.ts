import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

import { CoursesComponent } from './courses/courses.component';
import { HomeProfessorComponent } from './home-professor/home-professor.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [CoursesComponent, HomeProfessorComponent],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    SidebarModule,
    ButtonModule
  ]
})
export class ProfessorModule { }
