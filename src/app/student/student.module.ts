import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeStudentComponent } from './home-student/home-student.component';
import { StudentRoutingModule } from './student-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonsModule } from '../commons/commons.module';
import { MyCoursesStudentComponent } from './my-courses-student/my-courses-student.component';
import { AllCoursesStudentComponent } from './all-courses-student/all-courses-student.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserInterceptor } from '../services/user.interceptor';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [HomeStudentComponent, MyCoursesStudentComponent, AllCoursesStudentComponent, ViewCourseComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SidebarModule,
    ButtonModule,
    CommonsModule,
    PdfViewerModule,
    ToastModule
  ],
})
export class StudentModule { }
