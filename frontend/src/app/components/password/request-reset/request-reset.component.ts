import { SnotifyService } from 'ng-snotify';
import { SignupService } from './../../../Services/signup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {

  email;
  emailInfo;
  error;

  constructor(
    private signupService : SignupService,
    private notify : SnotifyService
  ) { }

  ngOnInit(): void {
  }

  handleResetPassword() {
    let payLoad = {
      email: this.email
    }
    this.signupService.sendPasswordResetLink(payLoad).subscribe(
      response => this.emailInfo = response,
      error => this.notify.error(error.error.error)
    );
  }

}
