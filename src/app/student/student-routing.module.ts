import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeStudentComponent } from './home-student/home-student.component';
import { AccountSettingsComponent } from '../commons/account-settings/account-settings.component';
import { MyCoursesStudentComponent } from './my-courses-student/my-courses-student.component';
import { AllCoursesStudentComponent } from './all-courses-student/all-courses-student.component';


const routes: Routes = [
  {
    path: '',
    component: HomeStudentComponent,
    children: [
      {
        path: 'settings',
        component: AccountSettingsComponent
      },
      {
        path:'my-courses',
        component: MyCoursesStudentComponent
      },
      {
        path: 'all-courses',
        component: AllCoursesStudentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
