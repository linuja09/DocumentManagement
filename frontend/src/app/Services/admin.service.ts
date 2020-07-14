import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllDocs() {
    return this.http.get( `${this.baseUrl}/getAllDocs`);
  }

  getAllUsers() {
    return this.http.get( `${this.baseUrl}/getAllUsers`);
  }

}
