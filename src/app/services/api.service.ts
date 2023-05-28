import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/login.model';
import { Observable } from 'rxjs';
import { SemesterResponse } from '../model/semester.model';
import { StudentResponse } from '../model/student.model';
import { CookieService } from 'ngx-cookie-service';
import { CourseResponse } from '../model/courses.model';
import { AssignedCoursesResponses } from '../model/assignedCourses.model';
import { CommonResponse } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = "http://localhost:5001/";
  private BASE_URL_API = this.BASE_URL + "api/";
  private LOGIN = "auth/student_login"
  private GET_SEMESTER = "get_semester"
  private GET_STUDENT_INFO = "student_info"
  private GET_COURSES = "courses"
  private GET_REGISTERED_COURSES = "get_registered_courses"
  private COURSE_REGISTRATION = "course_registration"

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createAuthorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'authorization': 'Bearer ' + this.cookieService.get('token'),
      'Access-Control-Allow-Origin': '*'
    });

    return headers;
  }

  studentLogin(roll: any): Observable<LoginResponse> {
    var formData: any = new FormData();
    formData.append('roll', roll);


    return this.http.post<LoginResponse>(this.BASE_URL + this.LOGIN, formData)
  }

  getSemester(): Observable<SemesterResponse> {

    let headers = this.createAuthorizationHeader();

    let options = { headers: headers };

    return this.http.get<SemesterResponse>(this.BASE_URL_API + this.GET_SEMESTER, options)
  }

  getStudentInfonByID(id: any): Observable<StudentResponse> {
    let headers = this.createAuthorizationHeader();
    var formData: any = new FormData();
    formData.append('id', id);

    const requestData = { params: formData, headers: headers };

    return this.http.post<StudentResponse>(this.BASE_URL_API + this.GET_STUDENT_INFO, formData, { headers });
  }

  getCourses(): Observable<CourseResponse> {
    let headers = this.createAuthorizationHeader();
    return this.http.get<CourseResponse>(this.BASE_URL_API + this.GET_COURSES, { headers });

  }

  getRegisteredCourse(): Observable<AssignedCoursesResponses> {
    let headers = this.createAuthorizationHeader();
    return this.http.get<AssignedCoursesResponses>(this.BASE_URL_API + this.GET_REGISTERED_COURSES, { headers });
  }

  courseRegistration(studentID: any, courseID: any, semesterID: any): Observable<CommonResponse> {
    let headers = this.createAuthorizationHeader();
    var formData: any = new FormData();
    formData.append('student_id', studentID);
    formData.append('course_id', courseID);
    formData.append('semester_id', semesterID);

    return this.http.post<CommonResponse>(this.BASE_URL_API + this.COURSE_REGISTRATION, formData, { headers })
  }
}
