import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './dashboard/students/students.component';
import { StudentsAbmComponent } from './dashboard/students-abm/students-abm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { CoursesAbmComponent } from './dashboard/courses-abm/courses-abm.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsAbmComponent,
    DashboardComponent,
    AuthComponent,
    CoursesComponent,
    CoursesAbmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
