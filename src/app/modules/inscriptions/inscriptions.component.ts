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
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router'

@Component({
  selector: 'app-inscription',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.css'],
  animations: [
    trigger('stepTransition', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-50px)' })),
      ]),
    ]),
  ],
})

export class InscriptionsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  courses: Course[] = [];
  seasons: Season[] = [];
  seasonsFilter: Season[] = [];

  //categorias = ['All', 'Nivel 1', 'Nivel 2', 'Nivel 3'];
  displayedColumns: string[] = ['course', 'mode', 'level', 'teacher', 'shift', 'actions'];

  // Desktop/Mobile filter
  searchTerm: string = '';
  categorias: string[] = ['All', 'Nivel 1', 'Nivel 2', 'Nivel 3', 'Basico'];
  selectedCategory: string = 'All';

  selectedCategories: Set<string> = new Set<string>(['All']);

  // Mobile stepper state
  currentStep: number = 1;
  isMobileView: boolean = false;

  // Selection state
  selectedCourse: any = null;
  selectedModality: string = '';
  selectedShift: string = '';
  selectedTeacher: any = null;

  loading: boolean = false;

  // Available teachers (will be filtered based on course/shift)
  availableTeachers: any[] = [];

  dataSource = new MatTableDataSource<Season>();

  constructor(
    private courseService: CourseService,
    private seasonService: SeasonService,
    private studentService: StudentService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkMobileView();
    this.getSeasonData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  checkMobileView(): void {
    this.isMobileView = window.innerWidth <= 480;
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

  filterSeasons(): void {
    let filtered = [...this.seasons];

    // Filter by category
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      filtered = filtered.filter(season => {
        const level = this.getLevelText(season.seas_course.cour_level);
        return level === this.selectedCategory;
      });
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(season => {
        const courseName = season.seas_course.cour_description.toLowerCase();
        const teacherName = (
          season.seas_teacher.memb_name + ' ' +
          season.seas_teacher.memb_surname
        ).toLowerCase();

        return courseName.includes(searchLower) || teacherName.includes(searchLower);
      });
    }

    this.seasonsFilter = filtered;
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
        const seasId = element.seas_id;
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

  nextStep(): void {
    if (this.currentStep < 5) {
      this.currentStep++;

      // Load teachers when reaching step 4
      if (this.currentStep === 4) {
        this.loadAvailableTeachers();
      }
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  handleBackButton(): void {
    if (this.currentStep === 1) {
      this.router.navigate(['/menu']);
    } else {
      this.previousStep();
    }
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Inscripciones';
      case 2:
        return 'Modalidad'
      case 3:
        return 'Turno'
      case 4:
        return 'Profesor'
      case 5:
        return 'Confirmación';
      default:
        return 'Inscripciones';
    }
  }

  selectCourse(course: any): void {
    this.selectedCourse = course;
    this.nextStep();
  }

  selectModality(modality: string): void {
    this.selectedModality = modality;
  }

  selectShift(shift: string): void {
    this.selectedShift = shift;
  }

  selectTeacher(teacher: any): void {
    this.selectedTeacher = teacher;
  }

  // ========== HELPER METHODS ==========

  getLevelText(level: number): string {
    if (level === 0 || level === 4) return 'Básico';
    return `Nivel ${level}`;
  }

  getShiftTime(): string {
    if (this.selectedShift === 'primer_turno') {
      return '19:00 a 20:30';
    } else if (this.selectedShift === 'segundo_turno') {
      return '20:30 a 22:00';
    }
    return '20:30';
  }

  loadAvailableTeachers(): void {
    // Filter teachers based on selected course and shift
    // Replace with actual service call

    // Mock data
    this.availableTeachers = [
      {
        memb_id: 1,
        memb_name: 'María Eumelia',
        memb_surname: 'Hambudge Luna'
      }
      // Add more teachers from your data
    ];
  }

  confirmInscription(){

  }

  cancelInscription(): void {
    this.resetStepper();
  }

  resetStepper(): void {
    this.currentStep = 1;
    this.selectedCourse = null;
    this.selectedModality = '';
    this.selectedShift = '';
    this.selectedTeacher = null;
    this.availableTeachers = [];
  }

}
