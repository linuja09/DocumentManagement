import { SignupService } from './../../Services/signup.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = {
    email: null,
    password: null
  }

  public error = null;
  constructor(private Signup : SignupService) { }

  ngOnInit(): void {
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleLogin() {
    this.Signup.login(this.loginForm).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        this.handleError(error)
      }

    )
  }

}
