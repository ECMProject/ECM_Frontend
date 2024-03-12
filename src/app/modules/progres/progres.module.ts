import { ProgresComponent } from './progres.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgClass, NgIf } from "@angular/common";
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { CdkTreeModule } from '@angular/cdk/tree';

const progresRoutes: Route[] = [
  {
    path: '',
    component: ProgresComponent
  }
];

@NgModule({
  declarations: [
    ProgresComponent,
  ],
  exports: [
    ProgresComponent
  ],
  imports: [
    RouterModule.forChild(progresRoutes),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    CommonModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    CdkTreeModule
    // Include MatSortModule
  ]
})
export class ProgresModule {}
