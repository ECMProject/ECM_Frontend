import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/student';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { CourseService } from 'src/app/services/courses.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { MemberService } from 'src/app/services/members.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('700ms ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
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
export class RegisterComponent implements OnInit {
  courses: Course[] = [];

  // Form data
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  documento: string;
  fechaCumpleanos: Date;
  zona: string;
  numeroCelular: string;

  // Stepper state
  currentStep: number = 1;
  isMobileView: boolean = false;
  studentType: string = ''; // 'nuevo' or 'recurrente'
  selectedCourses: number[] = [];

  coursesData: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private courseService: CourseService,
    private memberService: MemberService,
    private snackBar: MatSnackBar,
  ) {
    this.nombres = '';
    this.apellidos = '';
    this.tipoDocumento = '';
    this.documento = '';
    this.fechaCumpleanos = new Date();
    this.zona = '';
    this.numeroCelular = '';
  }

  ngOnInit() {
    this.checkMobileView();
    this.loadCourses();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobileView();
  }

  checkMobileView() {
    this.isMobileView = window.innerWidth <= 415;
  }

  loadCourses() {
    this.courseService.getCoursesList().subscribe(
      (data) => {
        this.courses = data;
        this.organizeCoursesByLevel(data);
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }

  organizeCoursesByLevel(courses: any[]) {
    // Group courses by level
    const levelMap = new Map();

    courses.forEach(course => {
      const level = course.cour_level || 0;
      if (!levelMap.has(level)) {
        levelMap.set(level, []);
      }
      levelMap.get(level).push({
        id: course.cour_id,
        name: course.cour_description
      });
    });

    // Convert map to array format for template
    this.coursesData = [];

    // Sort levels
    const sortedLevels = Array.from(levelMap.keys()).sort((a, b) => a - b);

    sortedLevels.forEach(level => {
      let levelName = '';

      if (level === 4 || level === '4') {
        levelName = 'Nivel Basico';
      } else {
        levelName = `Nivel ${level}`;
      }

      this.coursesData.push({
        level: level,
        name: levelName,
        courses: levelMap.get(level)
      });
    });
  }

  // Step navigation
  nextStep() {
    if (this.currentStep === 1 && !this.isStep1Valid()) {
      this.snackBar.open('Por favor, complete todos los campos.', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    if (this.currentStep === 3 && !this.studentType) {
      return;
    }

    // Skip step 4 if user is new student
    if (this.currentStep === 3 && this.studentType === 'nuevo') {
      this.completeRegistration();
      return;
    }

    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  handleBackButton() {
    if (this.currentStep === 1) {
      this.router.navigate(['/login']);
    } else {
      this.previousStep();
    }
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Crear una cuenta';
      case 2:
        return 'Crear una cuenta';
      case 3:
        return '¿Eres nuevo en la ECM?';
      case 4:
        return 'Cursos realizados';
      default:
        return '';
    }
  }

  // Validation
  isStep1Valid(): boolean {
    return !!(
      this.nombres &&
      this.apellidos &&
      this.tipoDocumento &&
      this.documento &&
      this.documento.length === 8 &&
      this.fechaCumpleanos &&
      this.zona &&
      this.numeroCelular &&
      this.numeroCelular.length === 9
    );
  }

  // Student type selection
  selectStudentType(type: string) {
    this.studentType = type;
  }

  // Course selection
  toggleCourse(courseId: number) {
    const index = this.selectedCourses.indexOf(courseId);
    if (index > -1) {
      this.selectedCourses.splice(index, 1);
    } else {
      this.selectedCourses.push(courseId);
    }
  }

  isCourseSelected(courseId: number): boolean {
    return this.selectedCourses.includes(courseId);
  }

  // Complete registration
  completeRegistration() {
    const formData = {
      memb_name: this.nombres.toUpperCase(),
      memb_surname: this.apellidos.toUpperCase(),
      memb_typedni: this.tipoDocumento,
      memb_dni: this.documento,
      birthdate: this.fechaCumpleanos,
      memb_zone: this.zona,
      memb_mobil: this.numeroCelular,
      is_new_student: this.studentType === 'nuevo',
      completed_courses: this.selectedCourses
    };

    // For mobile, directly process the registration
    if (this.isMobileView) {
      
      this.snackBar.open('Registro completado exitosamente', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }
  }

  // Desktop registration (original method)
  openDialog() {
    const formData = {
      memb_name: this.nombres.toUpperCase(),
      memb_surname: this.apellidos.toUpperCase(),
      memb_typedni: this.tipoDocumento,
      memb_dni: this.documento,
      birthdate: this.fechaCumpleanos,
      memb_zone: this.zona,
      memb_mobil: this.numeroCelular,
    };

    if (
      !formData.memb_name ||
      !formData.memb_surname ||
      !formData.memb_typedni ||
      !formData.memb_dni ||
      !formData.birthdate ||
      !formData.memb_zone ||
      !formData.memb_mobil
    ) {
      this.snackBar.open('Por favor, complete todos los campos.', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });

      return;
    } else {
      this.courseService.getCoursesList().subscribe(
        (data) => {
          const dialogRef = this.dialog.open(RegisterDialogComponent, {
            width: '400px',
            height: '400px',
            data: { cursos: data, personalData: formData },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    }
  }
}