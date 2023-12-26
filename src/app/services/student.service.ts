import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { catchError, Observable, retry, throwError } from 'rxjs';

import { Student } from './../models/student';

@Injectable({
  providedIn: 'root',
})

export class StudentService {
  // Endpoint Backend
  basePath = 'http://127.0.0.1:8000/ecm';

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

  getStudentSeasons(user_id: number): Observable<Student[]> {
    const url = `${this.basePath}/season/${user_id}`;
    return this.http
      .get<Student[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  inscribirStudent(data: any): Observable<any> {
    const url = `${this.basePath}/student/create`;
    return this.http
      .post(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
