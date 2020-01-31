import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { HomeProfessorComponent } from './home-professor/home-professor.component';


const routes: Routes = [
  {
    path: '',
    component: HomeProfessorComponent,
    children: [
      {
        path: 'courses',
        component: CoursesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessorRoutingModule { }
