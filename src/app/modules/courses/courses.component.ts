import { Component } from '@angular/core';
import { Course } from './../../models/student';
import { Season } from './../../models/student';
import { SeasonService } from './../../services/season.service';
import { CourseService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})

export class CoursesComponent {
  courses: Course[] = [];
  seasons: Season[] = [];
  seasonsFilter: Season[] = [];

  categorias = ['All', 'Nivel 1', 'Nivel 2', 'Nivel 3'];

  selectedCategory: string | null = 'All';
  selectedCategories: Set<string> = new Set<string>(['All']);

  constructor(
    private courseService: CourseService,
    private seasonService: SeasonService
  ) {}

  ngOnInit(): void {
    this.getSeasonData();
  }

  getSeasonData() {
    this.seasonService.getSeasonList().subscribe(
      (data) => {
        this.seasons = data;
        this.seasonsFilter = this.seasons;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
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
  }
}
