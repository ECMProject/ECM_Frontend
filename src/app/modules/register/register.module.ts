import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { CommonModule } from '@angular/common';

import { NgClass, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';

const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent
  }
];

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  exports: [
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(registerRoutes),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    CommonModule,
    MatChipsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule
    // Include MatSortModule
  ]
})
export class RegisterModule {}
