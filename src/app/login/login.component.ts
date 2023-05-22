import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ValidationControl } from '../model/validation.model';
import { ApiService } from '../services/api.service';
import { LoginResponse } from '../model/login.model';
import { take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rollPattern = "[0-9]{6}"

  validation: ValidationControl = {};

  constructor(private router: Router, private apiService: ApiService, private cookieServie : CookieService) {

  }


  ngOnInit(): void {

    // this.validation.error = false
    // this.validation.success = false
  }

  loginResponse?: LoginResponse

  signIn(roll: any) {

    // if (roll.length < 6) {
    //   this.validate = false
    //   this.validationMessage = "password must be 6 digit"
    // }else{
    //   console.log(roll);
    // }

    if (!roll.match(this.rollPattern)) {
      this.validation.error = true
      this.validation.success = false
      this.validation.message = "invalid roll [0-9 and 6 digit]"
    } else {
      this.apiService.studentLogin(roll).pipe(take(1)).subscribe({
        next: (response) => {
          this.loginResponse = response;

          if (this.loginResponse.message != "Incorrect result size: expected 1, actual 0") {
            this.validation.error = false
            this.validation.success = true
            this.validation.message = "login successfully"

            this.cookieServie.set("id", this.loginResponse.data.id.toString());
            this.cookieServie.set("token", this.loginResponse.data.token);
            this.router.navigate(["/home"]);
          } else {
            this.validation.error = true
            this.validation.success = false
            this.validation.message = "invalid request"

            
          }

          //console.log(this.loginResponse)
        }
      });
    }
  }

}
