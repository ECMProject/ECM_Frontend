import { Component, OnInit } from '@angular/core';
import { Course, Student } from 'src/app/models/student';
import { CourseService } from 'src/app/services/courses.service';
import { ChartData, ChartType } from 'chart.js';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-progres',
  templateUrl: './progres.component.html',
  styleUrls: ['./progres.component.css']
})

export class ProgresComponent implements OnInit {
  courses: Course[] = [];
  completedCourses: Student[] = [];
  pieChartData: ChartData[] = [];
  loading: boolean = false;

  constructor(private courseService: CourseService, private studentService: StudentService) {}

  ngOnInit(): void {
    this.getCoursesList();
    this.getCoursesCompleted();
  }

  public chartType: ChartType = 'doughnut';

  public chartOptions: any = {
    responsive: true,
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

  getCoursesCompleted() {
    this.loading= true;
    let userId = localStorage.getItem('userId');
    userId = userId ?? '1';
    this.studentService.getCoursesCompleted(parseInt(userId)).subscribe(
      (data) => {
        this.completedCourses = data;
        this.updatePieChartData();
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

  getLevelCourses(
    level: number,
    filter?: (course: Course) => boolean
  ): Course[] {
    let filteredCourses = filter ? this.courses.filter(filter) : this.courses;
    let levelCourses = filteredCourses.filter(
      (course) => course.cour_level === level
    );
    levelCourses.sort((a, b) =>
      a.cour_description.localeCompare(b.cour_description)
    );
    return levelCourses;
  }

  calcularProgreso(nivel: number) {
    return nivel;
  }

  updatePieChartData() {
    const uniqueLevels = this.getUniqueLevels();
    this.pieChartData = uniqueLevels.map(level => {
      const levelCourses = this.getLevelCourses(level);
      const completedCount = levelCourses.filter(course => 
        this.completedCourses.some(completedCourse => completedCourse.stud_season.seas_course.cour_id === course.cour_id)
      ).length;
      const notCompletedCount = levelCourses.length - completedCount;
      return {
        level: `Nivel ${level}`,
        datasets: [
          {
            data: [completedCount, notCompletedCount],
            backgroundColor: [
              'rgb(70,110,240)', //AZUL
              'rgb(255,20,26)', //ROJO
            ], // Colores para las secciones del donut
          },
        ],
      };
    });
    this.loading= false;
  }
  
  isCourseCompleted(course: Course): boolean {
    return this.completedCourses.some(completedCourse => completedCourse.stud_season.seas_course.cour_id === course.cour_id);
  }
  
}
