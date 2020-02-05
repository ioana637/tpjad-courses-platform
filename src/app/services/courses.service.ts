import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { coursesGetAll, coursesAddEdit, coursesSendNewsToStudents, coursesFilter, coursesMy, coursesDeleteAndGetById, coursesEnroll, coursesStudentsForCourse, coursesNumberStudents } from './urls';
import { Course } from '../utils/structures';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Accept': '*/*',
      // 'Access-Control-Allow-Origin': '*'
    });
  }

  fetchAllCourses() {
    return this.http.get(coursesGetAll, {headers: this.httpHeaders});
  }

  saveCourse(course: Course) {
    console.log(course);
    return this.http.post(coursesAddEdit, JSON.stringify(course), {headers: this.httpHeaders});
  }

  sendMailToStudents(obj: {courseId: number, message: string}){
    return this.http.post(coursesSendNewsToStudents, JSON.stringify(obj), {headers: this.httpHeaders});
  }

  filterCourses(text: string) {
    return this.http.get(`${coursesFilter}?filter=${text}`,{headers: this.httpHeaders} );
  }

  getMyCourses() {
    return this.http.get(coursesMy, {headers: this.httpHeaders, withCredentials: true});
  }  

  getCourseById(courseId: number) {
    return this.http.get(coursesDeleteAndGetById(courseId.toString()), {headers: this.httpHeaders} );
  }

  enrollToCourse(courseId: number) {
    return this.http.post(coursesEnroll(courseId.toString()), null, {headers: this.httpHeaders} );
  }

  getStudentsForCourse(courseId: number) {
    return this.http.get(coursesStudentsForCourse(courseId.toString()), {headers: this.httpHeaders} );
  }

  getNumberStudentsForCourse(courseId: number) {
    return this.http.get(coursesNumberStudents(courseId.toString()), {headers: this.httpHeaders} );
  }
}
