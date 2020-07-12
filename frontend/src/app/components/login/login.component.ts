import { TokenService } from './../../Services/token.service';
import { SignupService } from './../../Services/signup.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email
  password

  public error = null;
  constructor(
    private Signup : SignupService,
    private Token : TokenService
    ) { }

  ngOnInit(): void {
  }

  handleLogin() {
    let temp = {
      email: this.email,
      password: this.password,
    }
    console.log(temp);
    this.Signup.login(temp).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
  }

  handleError(error) {
    this.error = error.error.error;
  }

}
