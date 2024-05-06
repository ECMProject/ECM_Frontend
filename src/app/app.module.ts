import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {appRoutes} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './modules/sidebar/sidebar.component';

import { MatDialogModule } from '@angular/material/dialog';
import { RegisterDialogComponent } from './modules/register-dialog/register-dialog.component';
import { InscriptionsDialogComponent } from './modules/inscriptions-dialog/inscriptions-dialog.component';
import { BodyComponent } from './modules/body/body.component';
import { LoginComponent } from './modules/login/login.component';
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RegisterDialogComponent,
    InscriptionsDialogComponent,
    BodyComponent,

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
