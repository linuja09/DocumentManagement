import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  public error = [];
  constructor(private http: HttpClient) { }

  handleError(error) {
    this.error = error.error.errors;
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

    this.http.post('http://localhost:8000/api/signup', temp).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        this.handleError(error)
      }
    )

  }

  ngOnInit(): void {
  }

}
