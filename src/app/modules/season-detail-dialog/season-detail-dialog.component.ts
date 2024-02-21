import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-season-detail-dialog',
  templateUrl: './season-detail-dialog.component.html',
  styleUrls: ['./season-detail-dialog.component.css']
})
export class SeasonDetailDialogComponent {
  ciclo: Student;

  constructor(
    public dialogRef: MatDialogRef<SeasonDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ciclo: Student }
  ) {
    this.ciclo = data.ciclo;
    console.log(this.ciclo);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
