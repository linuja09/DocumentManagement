import { TokenService } from './../Services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token = null;


  constructor(
    private tokenService: TokenService
  ) {

  }

  /**
   * intercept all requests and responses
   * @param request
   * @param next
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {

    this.token = this.tokenService.get();

    if(this.token){
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
    }


    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 400) {
              // ToDo redirection to login
            }
          }
        },
      ),
    );
  }
}
