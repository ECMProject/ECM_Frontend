import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/student';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { CourseService } from 'src/app/services/courses.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { MemberService } from 'src/app/services/members.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('700ms ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private courseService: CourseService,
    private memberService: MemberService,
    private snackBar: MatSnackBar,
  ) {
    this.nombres = '';
    this.apellidos = '';
    this.tipoDocumento = '';
    this.documento = '';
    this.fechaCumpleanos = new Date();
    this.zona = '';
    this.numeroCelular = '';
  }

  openDialog() {
    const formData = {
      memb_name: this.nombres.toUpperCase(),
      memb_surname: this.apellidos.toUpperCase(),
      memb_typedni: this.tipoDocumento,
      memb_dni: this.documento,
      birthdate: this.fechaCumpleanos,
      memb_zone: this.zona,
      memb_mobil: this.numeroCelular,
    };

    if (
      !formData.memb_name ||
      !formData.memb_surname ||
      !formData.memb_typedni ||
      !formData.memb_dni ||
      !formData.birthdate ||
      !formData.memb_zone ||
      !formData.memb_mobil
    ) {
      this.snackBar.open('Por favor, complete todos los campos.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      
      return;
    } else {
      this.courseService.getCoursesList().subscribe(
        (data) => {
          const dialogRef = this.dialog.open(RegisterDialogComponent, {
            width: '400px',
            height: '400px',
            data: { cursos: data, personalData: formData },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    }
  }
}
