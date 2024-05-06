import { Component } from '@angular/core';
import { Member, Student } from 'src/app/models/student';
import { MemberService } from 'src/app/services/members.service';
import { StudentService } from 'src/app/services/student.service';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  persons: Member[] = [];
  studentSeasons: Student[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  loadingTable: boolean = false;
  selectedPersonId: any = null;
  buttonsDisabled = false;
  buttonSearchDisabled = false;

  dataSource = new MatTableDataSource<Student>();

  displayedColumns: string[] = ['period', 'course', 'teacher', 'mode', 'note'];

  constructor(
    private memberService: MemberService,
    private studentService: StudentService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  enableButtonsExceptSelected() {
    this.buttonsDisabled = false;
  }

  clear() {
    this.searchTerm= '';
    this.buttonSearchDisabled = false;
    this.persons = [];
    this.dataSource.data = [];
    this.enableButtonsExceptSelected();
  }

  verCursos(userId: number) {
    this.selectedPersonId = userId;
    this.buttonsDisabled = true;
    this.buttonSearchDisabled = true;
    this.loadingTable = true;

    this.studentService.getStudentSeasons(userId).subscribe(
      (data) => {
        this.studentSeasons = data;
        this.dataSource.data = this.studentSeasons;
        this.dataSource.paginator = this.paginator;
        this.loadingTable = false;
        this.enableButtonsExceptSelected();
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.loadingTable = false;
      }
    );
  }

  searchUsers() {
    this.loading = true;
    this.persons = [];
    this.dataSource = new MatTableDataSource();
    if (this.searchTerm.trim() === '') {
      return;
    }

    this.memberService.getMembersByName(this.searchTerm).subscribe(
      (data) => {
        this.persons = data;
        this.loading = false;
        //this.dataSource.data = this.persons;
        //this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.loading = false;
      }
    );
  }
}
