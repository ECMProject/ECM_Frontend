import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoggedInState());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  basePath = 'http://127.0.0.1:8000/ecm';

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  constructor(private http: HttpClient) {
    const initialLoggedInState = this.getInitialLoggedInState();
    this.isLoggedInSubject.next(initialLoggedInState);
  }

  private getInitialLoggedInState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(dni: string): Observable<any> {
    const url = `${this.basePath}/login/${dni}`;
    return this.http.get(url);
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value.toString());
  }
}
