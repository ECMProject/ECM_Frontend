import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-season-detail-dialog',
  templateUrl: './season-detail-dialog.component.html',
  styleUrls: ['./season-detail-dialog.component.css']
})
export class SeasonDetailDialogComponent {

  // Objeto para almacenar el ciclo
  ciclo: Student;

  constructor(
    public dialogRef: MatDialogRef<SeasonDetailDialogComponent>,
    // Recibe el objeto ciclo desde el componente
    @Inject(MAT_DIALOG_DATA) public data: { ciclo: Student }
  ) {
     // Asigna el objeto ciclo
    this.ciclo = data.ciclo;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
