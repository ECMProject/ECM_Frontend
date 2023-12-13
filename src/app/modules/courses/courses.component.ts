import { Component } from '@angular/core';
import { Course } from './../../models/student';
import { Season } from './../../models/student';
import { SeasonService } from './../../services/season.service';
import { CourseService } from 'src/app/services/courses.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})

export class CoursesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  courses: Course[] = [];
  seasons: Season[] = [];
  seasonsFilter: Season[] = [];

  categorias = ['All', 'Nivel 1', 'Nivel 2', 'Nivel 3'];

  selectedCategory: string | null = 'All';
  selectedCategories: Set<string> = new Set<string>(['All']);

  searchTerm: string = '';

  dataSource = new MatTableDataSource<Season>();

  constructor(
    private courseService: CourseService,
    private seasonService: SeasonService
  ) {}

  ngOnInit(): void {
    this.getSeasonData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getSeasonData() {
    this.seasonService.getSeasonList().subscribe(
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
}
