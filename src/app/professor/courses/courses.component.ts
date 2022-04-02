import {Component, OnInit, OnDestroy} from '@angular/core';
import {Course, Lecture, User} from 'src/app/utils/structures';
import {ToastService} from 'src/app/services/toast.service';
import {CoursesService} from 'src/app/services/courses.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: Course[];
  subscription: Subscription[] = [];

  constructor(private toastService: ToastService,
              private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.fetchCourses();
  }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
  }

  fetchCourses() {
    this.subscription.push(
      this.coursesService.getMyCourses().subscribe((data: Course[]) => {
        this.courses = data;
        this.courses.forEach((course) => {
          this.subscription.push(this.coursesService.getNumberStudentsForCourse(course.id).subscribe(
            (res: { studentsNumber: number }) => {
              const id = this.courses.findIndex((c) => c.id === course.id);
              this.courses[id].studentsSignedIn = res.studentsNumber;
            }
          ));
        });

      }));
    this.courses = [
      {
        id: 2,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
        lectures: [
          {
            courseId: 2,
            date: new Date(),
            filename: 'filename.pdf',
            id: 1,
            title: 'Lecture 1'
          },
          {
            courseId: 2,
            date: new Date(),
            filename: 'filename2.pdf',
            id: 2,
            title: 'Lecture 2'
          },
          {
            courseId: 2,
            date: new Date(),
            filename: 'filename3.pdf',
            id: 3,
            title: 'Lecture 3'
          }
        ],
        maxStudents: 30,
        studentsSignedIn: 20,
        title: 'Course 2',
        year: '2019',
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
      },
      {
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
      }
    ];
  }

  messageReceived(msg) {
    switch (msg.type) {
      case 'error': {
        this.toastService.addError(msg.message);
        break;
      }
      case 'info': {
        this.toastService.addInfo(msg.message);
        break;
      }
      case 'success': {
        this.toastService.addSuccess(msg.message);
        if (msg.message.indexOf('Course deleted') > -1) {
          this.fetchCourses();
        }
        break;
      }
      case 'warning': {
        this.toastService.addWarning(msg.message);
        break;
      }
      default: {
        this.toastService.addInfo(msg.message);
        break;
      }
    }
  }

}
