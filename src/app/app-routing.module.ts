import { LoginModule } from './modules/login/login.module';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('src/app/modules/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
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
  {
    path: 'search',
    loadChildren: () =>
      import('src/app/modules/search/search.module').then(
        (m) => m.SearchModule
      ),
  },
];
