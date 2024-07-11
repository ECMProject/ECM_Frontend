import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, retry, throwError } from 'rxjs';
import { Member } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  // Endpoint Backend
  //basePath = 'http://127.0.0.1:8000/ecm/members';

  basePath = 'http://209.38.192.175/backend/ecm/members';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(
      () => new Error('Something happened with request, please try again later')
    );
  }

  getMembersByName(name: string): Observable<Member[]> {
    let url = '';
    if (name.trim() === '') {
      url = `${this.basePath}/list`;
    } else {
      url = `${this.basePath}/list?name=${name}`;
    }

    return this.http
      .get<Member[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  registerMember(personalData: any): Observable<any> {
    return this.http
      .post<any>(`${this.basePath}/create`, personalData)
      .pipe(retry(2), catchError(this.handleError));
  }
}
