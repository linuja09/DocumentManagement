import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(temp) {
    return this.http.post(`${this.baseUrl}/login`, temp)
  }

  signup(temp) {
    return this.http.post(`${this.baseUrl}/signup`, temp)
  }

}
