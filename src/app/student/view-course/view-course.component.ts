import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, Lecture } from 'src/app/utils/structures';
import { CoursesService } from 'src/app/services/courses.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {

  courseId: number;
  course: Course;
  pdfSrc: any;
  constructor(private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private courseService: CoursesService) { }

  ngOnInit() {
    this.courseId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.courseService.getCourseById(this.courseId).subscribe((res) => {
      this.course = res;
      console.log(res);
      this.course.professor = this.course.users.filter((user) => user.role === 'PROFESSOR')[0];
    })
  }

  downloadFile(lecture: Lecture) {
    console.log('downloadFile');
    this.displayPDF(lecture);
    let link = document.createElement("a");
    link.download = lecture.filename;
    link.href = this.pdfSrc;
    link.click();
  }

  displayPDF(lecture: Lecture) {
    let file = new File([lecture.attachment], lecture.filename, { type: 'application/pdf' });
    // this.pdfSrc = lecture.attachment;
    this.pdfSrc = URL.createObjectURL(file);
    this.pdfSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
    // this.pdfSrc = this.pdfSrc.changingThisBreaksApplicationSecurity;
    console.log(this.pdfSrc);
  }


}
