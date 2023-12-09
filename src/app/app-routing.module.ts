import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },

  {
    path: 'courses',
    loadChildren: () =>
      import('src/app/modules/courses/courses.module').then(
        (m) => m.CoursesModule
      ),
  },
  {
    path: 'seasons',
    loadChildren: () =>
      import('src/app/modules/seasons/seasons.module').then(
        (m) => m.SeasonsModule
      ),
  },
  {
    path: 'inscriptions',
    loadChildren: () =>
      import('src/app/modules/inscriptions/inscriptions.module').then(
        (m) => m.InscriptionsModule
      ),
  },
];
