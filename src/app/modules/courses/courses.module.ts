import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule

import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import {NgClass, NgIf} from "@angular/common";

const coursesRoutes: Route[] = [
  {
    path: '',
    component: CoursesComponent
  }
];

@NgModule({
  declarations: [
    CoursesComponent,
  ],
  exports: [
    CoursesComponent
  ],
  imports: [
    RouterModule.forChild(coursesRoutes),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    CommonModule,
    // Include MatSortModule
  ]
})
export class CoursesModule {}
