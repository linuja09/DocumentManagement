import { TokenService } from './../../Services/token.service';
import { AuthService } from './../../Services/auth.service';
import { SignupService } from './../../Services/signup.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    email
    name
    password
    password_confirmation

  public error_name = null;
  public error_email = null;
  public error_password = null;

  constructor(
    private Signup : SignupService,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    ) { }

  handleError(error) {
    this.error_name = error.error.errors.name;
    this.error_email = error.error.errors.email;
    this.error_password = error.error.errors.password;
  }

  load() {
    console.log(this.name);
  }

  handleSignup() {

    let temp = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }


    console.log(this.name);

    this.Signup.signup(temp).subscribe(
      (response) => {
        this.handleResponse(response);
      },
      (error) => {
        this.handleError(error);
      }
    )

  }

  handleResponse(data) {
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl("/home")
  }

  ngOnInit(): void {
  }

}
