import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';


  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());
  private admin = new BehaviorSubject<boolean>(false);
  authStatus = this.loggedIn.asObservable();
  isAdmin = this.admin.asObservable();

  changeAuthStatus(status: boolean) {
    this.loggedIn.next(status)
  }

  setAdminStatus(status:any){
    this.admin.next(status)
  }

  constructor(
    private tokenService : TokenService,
    private http: HttpClient
  ) {
    this.http.get( `${this.baseUrl}/isAdmin`).subscribe(
      data=> {
       this.setAdminStatus(data)
      }
    )
   }
}
