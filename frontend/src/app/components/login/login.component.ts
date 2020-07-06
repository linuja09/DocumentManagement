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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleLogin() {
    this.http.post('http://localhost:8000/api/login', this.loginForm).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }

    )
  }

}
