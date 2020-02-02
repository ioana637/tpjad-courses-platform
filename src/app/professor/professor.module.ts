import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';

import { CoursesComponent } from './courses/courses.component';
import { HomeProfessorComponent } from './home-professor/home-professor.component';
import { ProfessorRoutingModule } from './professor-routing.module';
import { ButtonModule } from 'primeng/button';
import { CommonsModule } from '../commons/commons.module';
import { UserInterceptor } from '../services/user.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [CoursesComponent, HomeProfessorComponent],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    SidebarModule,
    ButtonModule,
    CommonsModule
  ],
})
export class ProfessorModule { }
