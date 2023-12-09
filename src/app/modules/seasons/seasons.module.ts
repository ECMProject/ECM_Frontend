import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { CommonModule } from '@angular/common';

import { SeasonsComponent } from './seasons.component';
import { NgClass, NgIf } from "@angular/common";

const seasonRoutes: Route[] = [
  {
    path: '',
    component: SeasonsComponent
  }
];

@NgModule({
  declarations: [
    SeasonsComponent,
  ],
  exports: [
    SeasonsComponent
  ],
  imports: [
    RouterModule.forChild(seasonRoutes),
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
export class SeasonsModule {}
