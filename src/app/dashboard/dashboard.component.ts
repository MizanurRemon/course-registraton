import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../services/api.service';
import { pipe, take } from 'rxjs';
import { SemesterResponse } from '../model/semester.model';
import { CourseResponse } from '../model/courses.model';
import { AssignedCoursesResponses } from '../model/assignedCourses.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: any;
  token: any;

  subjectTitle = "Course List"

  semesterTitle = "Semester List"

  assignedCourses = "Assigned Courses"

  constructor(private cookieService: CookieService, private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.id = this.cookieService.get("id")
    this.token = this.cookieService.get("token");

    this.getSemester()
    this.getCourses()
    this.getAssignedCourses()
  }

  semesterResponse?: SemesterResponse
  courseResponse?: CourseResponse
  assignedCoursesRespons? : AssignedCoursesResponses

  getSemester() {
    this.apiService.getSemester().pipe(take(1)).subscribe({
      next: (response) => {
        this.semesterResponse = response;
        console.log(this.semesterResponse)
      }
    });
  }

  getCourses() {
    this.apiService.getCourses().pipe(take(1)).subscribe({
      next: (response) => {
        this.courseResponse = response
        console.log(this.courseResponse)
      }
    });
  }

  getAssignedCourses(){
    this.apiService.getRegisteredCourse().pipe(take(1)).subscribe({
      next: (response) => {
        this.assignedCoursesRespons = response
        console.log(this.assignedCoursesRespons)
      }
    });
  }

}
