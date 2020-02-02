import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardStudentComponent } from './course-card-student.component';

describe('CourseCardStudentComponent', () => {
  let component: CourseCardStudentComponent;
  let fixture: ComponentFixture<CourseCardStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCardStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
