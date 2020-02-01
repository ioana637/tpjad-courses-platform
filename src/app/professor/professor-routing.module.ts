import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { HomeProfessorComponent } from './home-professor/home-professor.component';
import { AccountSettingsComponent } from '../commons/account-settings/account-settings.component';
import { AddEditCourseComponent } from '../commons/add-edit-course/add-edit-course.component';


const routes: Routes = [
  {
    path: '',
    component: HomeProfessorComponent,
    children: [
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'courses/add',
        component: AddEditCourseComponent
      },
      {
        path: 'courses/:id',
        component: AddEditCourseComponent
      },
      {
        path: 'settings',
        component: AccountSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
