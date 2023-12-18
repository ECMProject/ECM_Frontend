import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { SeasonDetailDialogComponent } from '../season-detail-dialog/season-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css'],
})
export class SeasonsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  studentSeasons: Student[] = [];

  displayedColumns: string[] = [
    'period',
    'course',
    'teacher',
    'mode',
    'note',
    'actions',
  ];
  selectedCategories: Set<string> = new Set<string>(['All']);

  dataSource = new MatTableDataSource<Student>();

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    const userId = 1;
    this.studentService.getStudentSeasons(userId).subscribe(
      (data) => {
        this.studentSeasons = data;
        this.dataSource.data = this.studentSeasons;
        this.dataSource.paginator = this.paginator;
        console.log('GET DATA');
        console.log(this.studentSeasons);
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  verDetalles(ciclo: Student) {
    const dialogRef = this.dialog.open(SeasonDetailDialogComponent, {
      data: { ciclo: ciclo }, // Pasa el objeto ciclo al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se cerró');
    });
  }
}
