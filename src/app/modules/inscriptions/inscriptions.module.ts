import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; // Import MatSortModule

import { CommonModule } from '@angular/common';

import { InscriptionsComponent } from './inscriptions.component';
import {NgClass, NgIf} from "@angular/common";

const inscriptionRoutes: Route[] = [
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
    RouterModule.forChild(inscriptionRoutes),
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
export class InscriptionsModule {}
