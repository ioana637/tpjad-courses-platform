import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/utils/structures';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-all-courses-student',
  templateUrl: './all-courses-student.component.html',
  styleUrls: ['./all-courses-student.component.scss']
})
export class AllCoursesStudentComponent implements OnInit, OnDestroy {
  courses: Course[];
  filterText: string;
  subscriptions: Subscription[] = [];

  constructor(private coursesService: CoursesService,
    private toastService: ToastService) {
  }

  ngOnInit() {
    this.fetchAllCourses();

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

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  fetchAllCourses() {
    this.subscriptions.push(this.coursesService.fetchAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
      this.courses.forEach((course) => {
        this.subscriptions.push(this.coursesService.getNumberStudentsForCourse(course.id).subscribe(
          (res: { studentsNumber: number }) => {
            const id = this.courses.findIndex((c) => c.id === course.id);
            this.courses[id].studentsSignedIn = res.studentsNumber;
          },
          (err) => {
            this.toastService.addError(err.error.message);
            console.log(err);
          }
        ))
      });
    }, (err) => {
      this.toastService.addError(err.error.message);
      console.log(err);
    }))

  }

  fetchCourses(event) {
    if (this.filterText && this.filterText.length > 0){
      this.filter();
    } else {
      this.fetchAllCourses();
    }
  }

  filter() {
    this.subscriptions.push(this.coursesService.filterCourses(this.filterText).subscribe((res: Course[]) => {
      this.courses = res;
    }, (err) => {
      this.toastService.addError(err.error.message);
      console.log(err);
    }));
  }

  reset() {
    this.filterText = '';
    this.fetchAllCourses();
  }
}
