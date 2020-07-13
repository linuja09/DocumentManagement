import { SignupService } from './../../../Services/signup.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {

  email
  password
  password_confirmation
  reset_token;

  public error_email = null;
  public error_password = null;

  public error = null;

  constructor(
    private route : ActivatedRoute,
    private signupService : SignupService
  ) {
    this.route.queryParams.subscribe(params => {
      this.reset_token = params['token']
      console.log(this.reset_token)
    });

  }

  handleError() {
    console.log('guyfffy')
    if(this.password !== this.password_confirmation){
      this.error_password = "Password does not mach";
    }
  }

  ngOnInit(): void {  }

  handleResetPassword() {
    let data = {
      email : this.email,
      password : this.password,
      password_confirmation : this.password_confirmation,
      reset_token : this.reset_token
    }
    this.signupService.changePassword(data).subscribe(
      data => console.log(data),
      error => this.error= error.error.error
      )
  }

}
