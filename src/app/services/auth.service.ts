import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoggedInState());
  private userNameSubject = new BehaviorSubject<string>(this.getInitialUserName());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  basePath = 'http://127.0.0.1:8000/ecm';

  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  constructor(private http: HttpClient) {
    const initialLoggedInState = this.getInitialLoggedInState();
    this.isLoggedInSubject.next(initialLoggedInState);

    const initialUserName = this.getInitialUserName();
    this.userNameSubject.next(initialUserName);
  }

  private getInitialLoggedInState(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private getInitialUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  login(dni: string): Observable<any> {
    const url = `${this.basePath}/login/${dni}`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        if (response) {
          console.log("DATA LOGIN:",response);
          const userName = response[0].memb_name;
          this.userNameSubject.next(userName);
          localStorage.setItem('userName', userName);
        }
      })
    );
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
    localStorage.setItem('isLoggedIn', value.toString());
  }
}
