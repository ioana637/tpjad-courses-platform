import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNewsComponent } from './share-news.component';

describe('ShareNewsComponent', () => {
  let component: ShareNewsComponent;
  let fixture: ComponentFixture<ShareNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
