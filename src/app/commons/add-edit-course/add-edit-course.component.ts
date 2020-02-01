import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Lecture } from 'src/app/utils/structures';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit {

  idCourse: number;
  course: Course;
  mode: string;
  display = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.idCourse = parseInt(this.route.snapshot.paramMap.get("id"));
    if (this.idCourse) {
      console.log('editMode', this.idCourse);
      this.mode = 'edit';
      this.course = {
        description: 'Description',
        id: 37,
        lectures: [
          {
            courseId: 37,
            date: new Date(),
            filename: 'l1.pdf',
            id: 15,
            title: 'Lecture 1'
          },
          {
            courseId: 37,
            date: new Date(),
            filename: 'l2.pdf',
            id: 16,
            title: 'Lecture 2'
          },
        ],
        maxStudents: 100,
        studentsSignedIn: 37,
        title: 'Title',
        year: '2020'
      }
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
