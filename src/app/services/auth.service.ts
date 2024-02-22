import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoggedInState());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  //basePath = 'http://127.0.0.1:8000/ecm';

  basePath = 'https://backend-ecm.onrender.com/ecm';

  constructor(private http: HttpClient, private router: Router) {}

  private getInitialLoggedInState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(dni: string): Observable<any> {
    const url = `${this.basePath}/login/${dni}`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        if (response) {
          localStorage.setItem('isLoggedIn', 'true');
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value.toString());
  }
}
