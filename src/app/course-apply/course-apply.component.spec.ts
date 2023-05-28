import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseApplyComponent } from './course-apply.component';

describe('CourseApplyComponent', () => {
  let component: CourseApplyComponent;
  let fixture: ComponentFixture<CourseApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseApplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
