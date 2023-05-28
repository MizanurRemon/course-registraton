import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';
import { SemesterResponse } from '../model/semester.model';
import { take } from 'rxjs';
import { CourseResponse } from '../model/courses.model';

@Component({
  selector: 'app-course-apply',
  templateUrl: './course-apply.component.html',
  styleUrls: ['./course-apply.component.css']
})
export class CourseApplyComponent implements OnInit {

  title = "Course Application"

  semesterResponse?: SemesterResponse
  courseResponse?: CourseResponse

  courseID: any;
  semesterID: any;
  studentID: any


  ngOnInit(): void {
    this.studentID = this.cookieService.get("id")
    this.getSemester()
    this.getCourses()
  }

  constructor(private cookieService: CookieService, private apiService: ApiService) {

  }



  getSemester() {
    this.apiService.getSemester().pipe(take(1)).subscribe({
      next: (response) => {
        this.semesterResponse = response;
      }
    });
  }

  getCourses() {
    this.apiService.getCourses().pipe(take(1)).subscribe({
      next: (response) => {
        this.courseResponse = response
      }
    });

  }

  getSemesterID(e: any) {
    if (e.target.value != 0) {
      this.semesterID = e.target.value

    }
  }

  getCourseID(e: any) {
    if (e.target.value != 0) {
      this.courseID = e.target.value

    }
  }

  courseApply() {

    this.apiService.courseRegistration(this.studentID, this.courseID, this.semesterID).pipe(take(1)).subscribe({

      next: (response) => {
        alert(response.message)
      }
    });
  }

}
