import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { MatChipsModule } from '@angular/material/chips';

import { CommonModule } from '@angular/common';

import { NgClass, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

const coursesRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent
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
    MatChipsModule,
    FormsModule
    // Include MatSortModule
  ]
})
export class LoginModule {}
