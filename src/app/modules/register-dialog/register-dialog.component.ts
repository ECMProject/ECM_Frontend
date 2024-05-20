import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Course } from 'src/app/models/student';
import { MemberService } from 'src/app/services/members.service';
import { CourseService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent {
  cursos: Course[];
  personalData: [];
  cursosSeleccionados: Course[] = [];
  member_id: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { cursos: Course[]; personalData: any },
    public memberService: MemberService,
    public courseService: CourseService,
    public dialogRef: MatDialogRef<RegisterDialogComponent>
  ) {
    this.cursos = data.cursos;
    this.personalData = data.personalData;
  }

  toggleCurso(curso: any) {
    if (this.cursosSeleccionados.includes(curso)) {
      this.cursosSeleccionados = this.cursosSeleccionados.filter(
        (c) => c !== curso
      );
    } else {
      this.cursosSeleccionados.push(curso);
    }
  }

  register(): void {
    this.memberService.registerMember(this.personalData).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.member_id = response.memb_id;
        console.log('RESPONSE 1', this.member_id);
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error en el registro:', error);
      }
    );

    //this.registerCourses(this.member_id);
  }

  registerCourses(member_id: number) {
    this.courseService
      .createSeason(this.cursosSeleccionados, member_id)
      .subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
        },
        (error) => {
          console.error('Error en el registro:', error);
          console.log(this.cursosSeleccionados);
        }
      );
  }
}
