import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userNameSubject = new BehaviorSubject<string>(this.getInitialUserName());
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoggedInState());

  userName$ = this.userNameSubject.asObservable();
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  //basePath = 'http://127.0.0.1:8000/ecm';

  basePath = 'https://backend-ecm.onrender.com/ecm';

  constructor(private http: HttpClient, private router: Router) {}

  private getInitialUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  private getInitialLoggedInState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(dni: string): Observable<any> {
    const url = `${this.basePath}/login/${dni}`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        if (response) {
          console.log("DATA LOGIN:", response);
          const userName = response[0].memb_name;
          const userRole = response[0].memb_role;
          localStorage.setItem('userName', userName);
          localStorage.setItem('userRole', userRole);
          console.log('Role Auth:', userRole);
          localStorage.setItem('isLoggedIn', 'true');
          this.userNameSubject.next(userName);
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
