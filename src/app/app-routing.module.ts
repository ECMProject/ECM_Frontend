import {Route} from "@angular/router";

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'config', pathMatch: 'full'},
  { path: 'config', loadChildren: () => import('src/app/modules/configuration/configuration.module').then(m => m.ConfigurationModule)},
];
