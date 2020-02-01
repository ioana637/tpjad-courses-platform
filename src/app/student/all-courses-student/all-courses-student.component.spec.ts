import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesStudentComponent } from './all-courses-student.component';

describe('AllCoursesStudentComponent', () => {
  let component: AllCoursesStudentComponent;
  let fixture: ComponentFixture<AllCoursesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCoursesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCoursesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
