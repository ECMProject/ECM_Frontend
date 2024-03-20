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
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgChartsModule } from 'ng2-charts'

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
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatProgressBarModule,
    NgChartsModule
  ]
})
export class ProgresModule {}
