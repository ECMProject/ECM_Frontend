import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent {

  studentSeasons: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const userId = 1;
    this.studentService.getStudentSeasons(userId).subscribe(
      (data) => {
        this.studentSeasons = data;
        console.log("GET DATA");
        console.log(this.studentSeasons);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  verDetalles(){
    console.log("Detalles");
  }
}
