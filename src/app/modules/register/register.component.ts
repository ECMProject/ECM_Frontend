import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('700ms ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})

export class RegisterComponent {
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  documento: string;
  fechaCumpleanos: Date;
  zona: string;
  numeroCelular: string;

  constructor(private authService: AuthService, private router: Router) {
    this.nombres = '';
    this.apellidos = '';
    this.tipoDocumento = '';
    this.documento = '';
    this.fechaCumpleanos = new Date();
    this.zona = '';
    this.numeroCelular = '';
  }

  login(): void {
    console.log("mami");
  }
}
