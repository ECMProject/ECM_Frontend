import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Course } from 'src/app/models/student';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {
  cursos: Course[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { cursos: Course[] }) { 
    this.cursos = data.cursos;
    console.log(this.cursos);
  }
}
