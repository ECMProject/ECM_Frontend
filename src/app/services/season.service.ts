import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

import { Season } from './../models/student';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  // Endpoint Backend
  //basePath = 'http://127.0.0.1:8000/ecm/season';
  //basePath = 'https://backend-ecm.onrender.com/ecm/season';

  basePath = 'http://209.38.192.175/backend/ecm/season';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),

  }

  constructor(private http: HttpClient) {
  }

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
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  getSeasonList(user_id: number): Observable<Season[]> {
    const url = `${this.basePath}/list/${user_id}`;
    return this.http
      .get<Season[]>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

}
