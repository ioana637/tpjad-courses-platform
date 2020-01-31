import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeStudentComponent } from './home-student/home-student.component';


const routes: Routes = [
  {
    path: '',
    component: HomeStudentComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
