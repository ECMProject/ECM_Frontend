import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Course} from 'src/app/models/student';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { CourseService } from 'src/app/services/courses.service';
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
  courses: Course[] = [];

  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  documento: string;
  fechaCumpleanos: Date;
  zona: string;
  numeroCelular: string;

  constructor(private authService: AuthService, private router: Router, 
    private dialog:MatDialog, private courseService: CourseService) {
    this.nombres = '';
    this.apellidos = '';
    this.tipoDocumento = '';
    this.documento = '';
    this.fechaCumpleanos = new Date();
    this.zona = '';
    this.numeroCelular = '';
  }

  register(): void {
    //Register process
    // .......... REGISTER LOGIC .............. //
    //Login to the account after registration
    this.authService.login(this.documento).subscribe(
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

  getCoursesList() {
    this.courseService.getCoursesList().subscribe(
      (data) => {
        const dialogRef = this.dialog.open(RegisterDialogComponent, {
          width: '400px',
          height: '400px',
          data: { cursos: data}
        });
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
