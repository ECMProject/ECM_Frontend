import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

const inscriptionsRoutes: Route[] = [
  {
    path: '',
    component: CoursesComponent,
  },
];

@NgModule({
  declarations: [CoursesComponent],
  exports: [CoursesComponent],
  imports: [
    RouterModule.forChild(inscriptionsRoutes),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    CommonModule,
    MatChipsModule,
    FormsModule,
    MatCheckboxModule,
    // Include MatSortModule
  ],
})
export class CoursesModule {}
