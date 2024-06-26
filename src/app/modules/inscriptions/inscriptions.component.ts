import { Component } from '@angular/core';
import { Course, Student } from '../../models/student';
import { Season } from '../../models/student';
import { SeasonService } from '../../services/season.service';
import { CourseService } from 'src/app/services/courses.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsDialogComponent } from '../inscriptions-dialog/inscriptions-dialog.component';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css'],
})

export class InscriptionsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  courses: Course[] = [];
  seasons: Season[] = [];
  seasonsFilter: Season[] = [];

  categorias = ['All', 'Nivel 1', 'Nivel 2', 'Nivel 3'];
  displayedColumns: string[] = ['course', 'mode', 'level', 'teacher', 'shift', 'actions'];

  selectedCategory: string | null = 'All';
  selectedCategories: Set<string> = new Set<string>(['All']);

  searchTerm: string = '';
  loading: boolean = false;

  dataSource = new MatTableDataSource<Season>();

  constructor(
    private courseService: CourseService,
    private seasonService: SeasonService,
    private studentService: StudentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getSeasonData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getSeasonData() {
    let student = localStorage.getItem('userId');
    student = student ?? '1';
    this.loading = true;
    this.seasonService.getSeasonList(parseInt(student)).subscribe(
      (data) => {
        this.seasons = data;
        this.seasonsFilter = this.seasons;
        this.filterSeasons();
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  filterSeasons() {
    this.seasonsFilter = this.seasons.filter(season =>
      season.seas_course.cour_description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.dataSource.data = this.seasonsFilter;
    this.dataSource.paginator = this.paginator;
    this.loading = false;
  }

  filtrarPorCategoria(categoria: string) {
    this.selectedCategories.clear();
    this.selectedCategories.add(categoria);
    this.selectedCategory = categoria;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    if (this.selectedCategories.has('All')) {
      this.seasonsFilter = this.seasons;
    } else {
      this.seasonsFilter = this.seasons.filter((season) => {
        const categoria = `Nivel ${season.seas_course.cour_level}`;
        return this.selectedCategories.has(categoria);
      });
    }

    this.dataSource.data = this.seasonsFilter;
    this.dataSource.paginator = this.paginator;
  }

  inscribirme(element: Season) {
    const dialogRef = this.dialog.open(InscriptionsDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let student = localStorage.getItem('userId') ?? '1';
        const studId = student;
        const seasId = element.seas_id ;
        const data = { stud_id: studId, seas_id: seasId };
  
        this.studentService.inscribirStudent(data).subscribe(
          (response) => {
            alert("Inscripción exitosa");
          },
          (error) => {
            console.error('Error al inscribir al estudiante', error);
          }
        );
      }
    });
  }
  
}
