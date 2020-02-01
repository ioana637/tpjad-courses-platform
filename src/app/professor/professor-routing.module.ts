import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { HomeProfessorComponent } from './home-professor/home-professor.component';
import { AccountSettingsComponent } from '../commons/account-settings/account-settings.component';


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
