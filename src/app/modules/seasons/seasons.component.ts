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
  filteredStudentSeasons: Student[] = []; // Para la vista móvil

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
  
  // Mobile filter properties
  searchTerm: string = '';
  selectedFilter: string | number = 'all';

  levelColors: LevelColors = {
    0: {
      backgroundColor: '#9c27b0', // Púrpura para Básico
    },
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
        this.filteredStudentSeasons = [...data];
        this.dataSource.data = this.studentSeasons;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.loading = false;
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

  // ========== MOBILE FILTER METHODS ==========

  filterByLevel(level: string | number): void {
    this.selectedFilter = level;
    this.applyFilters();
  }

  filterCourses(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.studentSeasons];

    // Filter by level
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(
        season => season.stud_season.seas_course.cour_level === this.selectedFilter
      );
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(season => {
        const courseName = season.stud_season.seas_course.cour_description.toLowerCase();
        const teacherName = (
          season.stud_season.seas_teacher.memb_name + ' ' + 
          season.stud_season.seas_teacher.memb_surname
        ).toLowerCase();
        
        return courseName.includes(searchLower) || teacherName.includes(searchLower);
      });
    }

    this.filteredStudentSeasons = filtered;
  }

  // ========== HELPER METHODS FOR MOBILE VIEW ==========

  getLevelText(level: number): string {
    if (level === 4) return 'Básico';
    return `Nivel ${level}`;
  }

  getStatusText(element: Student): string {
    const level = element.stud_season.seas_course.cour_level;
    if (level === 0 || level === 1) {
      return 'Troncal';
    }
    return 'Electivo';
  }

  getCourseSchedule(element: Student): string {
    // Si tienes el horario en tu modelo, úsalo
    // return element.stud_season.seas_schedule || '20:30';
  
    return '20:30'; // Placeholder
  }

  getCourseStartDate(element: Student): string {
    return element.stud_season.seas_period.peri_description || '-';
  }
}