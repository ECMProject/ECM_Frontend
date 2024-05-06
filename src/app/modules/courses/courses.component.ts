import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/student';
import { Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Pipe({
  name: 'values',
})
export class ValuesPipe implements PipeTransform {
  transform(value: any): any[] {
    return Object.values(value);
  }
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Student>();
  groupedDataArray: any[] = [];

  isEditing = false;
  loading: boolean = false;

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
    public dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getTeacherData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTeacherData() {
    this.loading = true;
    let teacher = localStorage.getItem('userId');
    teacher = teacher ?? '1';

    this.studentService.getTeacherList(parseInt(teacher)).subscribe(
      (data) => {
        this.loading = false;
        this.dataSource.data = data;
        this.groupedDataArray = this.groupDataByCourse(data);
        console.log(this.groupedDataArray);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  groupDataByCourse(data: any[]): any[] {
    return data.reduce((acc, student) => {
      const courseId = student.stud_season.seas_course.cour_id;

      if (!acc[courseId]) {
        acc[courseId] = {
          course: student.stud_season.seas_course,
          teacher: student.stud_season.seas_teacher,
          students: [],
        };
      }

      acc[courseId].students.push(student);
      return acc;
    }, {});
  }

  save(): void {
    this.dataSource.data.forEach((element) => {
      this.updateStudent(element.stud_id, element);
    });
  }

  updateStudent(element: any, newData: any): void {
    const updatedData = { ...element, ...newData };

    this.studentService.updateStudent(element, updatedData).subscribe(
      (response) => {
        console.log('Student updated successfully:', response);
        window.location.reload();
      },
      (error) => {
        console.error('Error updating student:', error);
      }
    );
  }
}
