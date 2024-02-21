import { SearchComponent } from './search.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgClass, NgIf } from "@angular/common";

const searchRoutes: Route[] = [
  {
    path: '',
    component: SearchComponent
  }
];

@NgModule({
  declarations: [
    SearchComponent,
  ],
  exports: [
    SearchComponent
  ],
  imports: [
    RouterModule.forChild(searchRoutes),
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgClass,
    NgIf,
    CommonModule,
    FormsModule
    // Include MatSortModule
  ]
})
export class SearchModule {}
