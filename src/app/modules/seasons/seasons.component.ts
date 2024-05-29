import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { SeasonDetailDialogComponent } from '../season-detail-dialog/season-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface LevelColors {
    [level: number]: {
        backgroundColor: string;
    };
}

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

  loading: boolean = false;

  levelColors: LevelColors = {
    1: {
        backgroundColor: '#42D663',
    },
    2: {
        backgroundColor: '#E5DF42',
    },
    3: {
        backgroundColor: '#F04646',
    },
};

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

  getLevelColor(level: number | string, colorType: 'backgroundColor'): string {
      if (typeof level === 'number') {
          return this.levelColors[level] ? this.levelColors[level][colorType] : '#468AF0';
      } else {
          return '#468AF0';
      } 
  }

  getData() {
    this.loading = true;
    let userId = localStorage.getItem('userId');
    userId = userId ?? '1';

    this.studentService.getStudentSeasons(parseInt(userId)).subscribe(
      (data) => {
        this.studentSeasons = data;
        this.dataSource.data = this.studentSeasons;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  verDetalles(ciclo: Student) {
    const dialogRef = this.dialog.open(SeasonDetailDialogComponent, {
      data: { ciclo: ciclo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se cerró');
    });
  }
}
