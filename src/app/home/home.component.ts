import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';
import { StudentResponse } from '../model/student.model';
import { CourseResponse } from '../model/courses.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: any;
  token: any;

  studentResponse?: StudentResponse

  selectedItem : any = "dashboard"
  

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.id = this.cookieService.get('id');
    this.token = this.cookieService.get('token');

    this.getStudentInfo()

  }

  constructor(private apiService: ApiService, private cookieService: CookieService) {

  }

  imageUrl: any

  getStudentInfo() {
    this.apiService.getStudentInfonByID(this.id).pipe(take(1)).subscribe({
      next: (response) => {
        this.studentResponse = response;
        this.imageUrl = "data:image/png;base64," + this.studentResponse.data?.image
        //console.log(this.studentResponse)
      }
    });
  }

 
  changeItem(text: any){
    this.selectedItem = text
  }

}
