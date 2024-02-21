import { Route } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  dni: string = '';

  constructor(private authService: AuthService, private router: Router) {
    
  }

  login(): void {
    this.authService.login(this.dni).subscribe(
      (response) => {
        if (!response.data) {
          localStorage.setItem('userId', response[0].memb_id);
          localStorage.setItem('userRole', response[0].memb_role);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/seasons']);
        }
      },
      (error) => {
        console.log('Bad Credentials');
      }
    );
  }
}
