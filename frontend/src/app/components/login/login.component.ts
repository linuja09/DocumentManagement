import { NotificationService } from './../../Services/notification.service';
import { AuthService } from './../../Services/auth.service';
import { TokenService } from './../../Services/token.service';
import { SignupService } from './../../Services/signup.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

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
    private signup : SignupService,
    private token : TokenService,
    private router : Router,
    private authService : AuthService,
    private notificationService : NotificationService
    ) { }

  ngOnInit(): void {
  }

  handleLogin() {
    let temp = {
      email: this.email,
      password: this.password,
    }
    console.log(temp);
    this.signup.login(temp).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.authService.changeAuthStatus(true);
    this.authService.setAdminStatus(data.isAdmin);
    this.notificationService.getActiveNotificationsCount(data.access_token);
    this.router.navigateByUrl("/")
  }

  handleError(error) {
    this.error = error.error.error;
  }

}
