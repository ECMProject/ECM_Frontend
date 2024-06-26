import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';

import { CommonModule } from '@angular/common';

import { InscriptionsComponent } from './inscriptions.component';
import { NgClass, NgIf } from "@angular/common";
import { FormsModule } from '@angular/forms';

const inscriptionsRoutes: Route[] = [
  {
    path: '',
    component: InscriptionsComponent
  }
];

@NgModule({
  declarations: [
    InscriptionsComponent,
  ],
  exports: [
    InscriptionsComponent
  ],
  imports: [
    RouterModule.forChild(inscriptionsRoutes),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    NgClass,
    NgIf,
    CommonModule,
    MatChipsModule,
    FormsModule,
  ]
})
export class InscriptionsModule {}
