import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  public getUsers() {
    return this.http.get( `${this.baseUrl}/getAllUsers`)
  }

  public getUserDocuments() {
    return this.http.get( `${this.baseUrl}/getAllUserDocuments`);
  }

  public getAllDocsUploadedToUser() {
    return this.http.get( `${this.baseUrl}/getAllDocsUploadedToUser`);
  }

  public getResource(id){
    const headers = new HttpHeaders();
    return this.http.get(`${this.baseUrl}/documents/${id}/download`, { headers, responseType: 'blob'});
  }

  public upload(data) {
    let uploadURL = `${this.baseUrl}/uploadFile`;

    return this.http.post(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
