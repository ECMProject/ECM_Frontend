import { Component } from '@angular/core';
import { Course } from 'src/app/models/student';
import { CourseService } from 'src/app/services/courses.service';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-progres',
  templateUrl: './progres.component.html',
  styleUrls: ['./progres.component.css'],
})
export class ProgresComponent {
  courses: Course[] = [];

  openPanelLevel: number | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCoursesList();
  }
  
  public chartType: ChartType = 'doughnut';

  public chartOptions: any = {
    responsive: true,
  };

  public chartData: ChartData = {
    labels: ['Blue','Red'],
    datasets: [
      {
        data: [8, 10],
        backgroundColor: [
          'rgb(36, 79, 243)', //AZUL
          'rgb(234, 52, 26)', //ROJO
        ], // Colores para las secciones del donut
      },
    ],
  };

  getCoursesList() {
    this.courseService.getCoursesList().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  getUniqueLevels(): number[] {
    return this.courses
      .map((course) => course.cour_level)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  getLevelCourses(level: number): Course[] {
    return this.courses.filter((course) => course.cour_level === level);
  }

  calcularProgreso(nivel: number) {
    return nivel;
  }

  isPanelOpen(level: number): boolean {
    return this.openPanelLevel === level;
  }

  onPanelOpened(level: number): void {
    this.openPanelLevel = level;
  }
}
