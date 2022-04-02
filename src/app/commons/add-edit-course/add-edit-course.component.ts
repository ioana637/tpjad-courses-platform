import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Lecture } from 'src/app/utils/structures';
import { ToastService } from 'src/app/services/toast.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

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
  pdfLocalUrl: any;
  timeout: any;

  constructor(private route: ActivatedRoute,
    private toastService: ToastService,
    private domSanitizer: DomSanitizer,
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
      this.course = {
            id: 1,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
            lectures: [
              {
                courseId: 1,
                date: new Date(),
                filename: 'filename.pdf',
                id: 1,
                title: 'Lecture 1'
              },
              {
                courseId: 1,
                date: new Date(),
                filename: 'filename2.pdf',
                id: 2,
                title: 'Lecture 2'
              },
              {
                courseId: 1,
                date: new Date(),
                filename: 'filename3.pdf',
                id: 3,
                title: 'Lecture 3'
              }
            ],
            maxStudents: 30,
            studentsSignedIn: 20,
            title: 'Course 1',
            year: '2020',
            users: [
              {
                email: 's1@mail.ro',
                id: '2',
                name: 'Name Student1',
                surname: 'Surname',
                role: 'student',
              },
              {
                email: 's2@mail.ro',
                id: '3',
                name: 'Name Student4',
                surname: 'Surname',
                role: 'student',
              },
              {
                email: 's3@mail.ro',
                id: '4',
                name: 'Name Student5',
                surname: 'Surname',
                role: 'student',
              },
              {
                email: 's4@mail.ro',
                id: '5',
                name: 'Name Student5',
                surname: 'Surname',
                role: 'student',
              }
            ],
            professor: {
              email: 'a@mail.ro',
              id: '1',
              name: 'Name Professor',
              surname: 'Surname',
              role: 'professor',
            }
          };
    }
    else {
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

  displayPdf(lecture: Lecture) {
    var byteArray = new Buffer(<string>lecture.attachment, 'base64');
    const file3 = new Blob([byteArray], { type: 'application/pdf' });
    this.pdfLocalUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(file3));
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
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    let lecturesToBeAdded = 0;
    this.course.lectures.forEach((lecture: Lecture) => {
      if (typeof lecture.attachment !== 'string') {
        lecturesToBeAdded = lecturesToBeAdded + 1;
        var reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer: any = reader.result;
          lecture.attachment = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        }
        reader.readAsArrayBuffer(<Blob>lecture.attachment);
      }
    })
    this.timeout = setTimeout(() => {
      // console.log(JSON.stringify(this.course));
      this.subscriptions.push(this.coursesService.saveCourse(this.course).subscribe((res) => {
        this.toastService.addSuccess('Course saved successfully!');
      }, (err) => {
        console.log(err);
        this.toastService.addError('Please try again. An error occured');
        // this.toastService.addError(err.error.message);
      }));
    }, 1000);
  }

  deleteLecture(lecture: Lecture) {
    const i = this.course.lectures.findIndex((l) => lecture.title === l.title);
    // TODO
    this.course.lectures.splice(i, 1);
  }

  seeEnrolledStudents() {
    this.display = true;
  }

  dialogClosed() {
    // this.display = false;
  }

}
