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

  constructor(
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getStudentData() {
    this.studentService.getStudentList().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
