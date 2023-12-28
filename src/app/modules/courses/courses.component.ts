import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Student>();

  displayedColumns: string[] = [
    'name',
    'session_1',
    'session_2',
    'session_3',
    'session_4',
    'session_5',
    'session_6',
    'session_7',
    'session_8',
    'session_9',
    'session_10',
    'session_11',
    'session_12',
    'promedio',
  ];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getTeacherData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTeacherData() {
    let teacher = localStorage.getItem('userId');
    teacher = teacher ?? '1';

    this.studentService.getTeacherList(parseInt(teacher)).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  save(): void {
    const updatedData = this.dataSource.data.filter(element => {
      // Filtrar solo los elementos modificados
      return (
        element.seas_ses01 !== element.original_ses01 ||
        element.seas_ses02 !== element.original_ses02 ||
        // ... repetir para otras sesiones ...
        element.seas_ses12 !== element.original_ses12
      );
    });

    // Llamada al servicio para guardar los datos modificados
    updatedData.forEach(element => {
      const studentId = element.stud_id;
      const updatedStudentData = {
        seas_ses01: element.seas_ses01,
        seas_ses02: element.seas_ses02,
        // ... repetir para otras sesiones ...
        seas_ses12: element.seas_ses12
      };

      this.studentService.updateStudent(studentId, updatedStudentData).subscribe(
        (response) => {
          console.log('Student updated successfully:', response);
          // Puedes realizar acciones adicionales después de la actualización
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    });
  }
}
