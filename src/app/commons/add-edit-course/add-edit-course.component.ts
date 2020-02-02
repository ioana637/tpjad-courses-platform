import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Lecture } from 'src/app/utils/structures';
import { ToastService } from 'src/app/services/toast.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit, OnDestroy {

  idCourse: number;
  course: Course;
  mode: string;
  display = false;
  subscriptions: Subscription[] = []

  constructor(private route: ActivatedRoute,
    private toastService: ToastService,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.idCourse = parseInt(this.route.snapshot.paramMap.get("id"));
    if (this.idCourse) {
      this.mode = 'edit';
      this.subscriptions.push(this.coursesService.getCourseById(this.idCourse).subscribe(
        (res: Course) => {
          this.course = res;
        }
      ))
     
    }
    else {
      console.log('add Mode');
      this.mode = 'add';

      this.course = {
        description: '',
        lectures: [
          {
            date: new Date(),
            title: '',
            attachment: null,
            filename: ''
          }
        ],
        title: '',
        year: '',
        maxStudents: 0,

      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onFileChanged(file, lecture) {
    lecture.filename = file.target.files[0].name;
    lecture.attachment = <File>file.target.files[0];
  }

  addNewLecture() {
    this.course.lectures.push({
      date: new Date(),
      title: '',
      attachment: null,
      filename: ''
    })
  }

  saveCourse() {
    console.log('save course');
    console.log(this.course);
  }

  deleteLecture(lecture: Lecture, index: number){
    this.course.lectures.splice(index,1);
  }

  seeEnrolledStudents(){
    this.display = true;
  }

  dialogClosed(){
    // this.display = false;
  }

}
