import { Route } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slideRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('700ms ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
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
          localStorage.setItem('name', response[0].memb_name);
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
