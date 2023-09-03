import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './dashboard/students/students.component';
import { StudentsAbmComponent } from './dashboard/students-abm/students-abm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { CoursesAbmComponent } from './dashboard/courses-abm/courses-abm.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentAbmComponent } from './dashboard/enrollment-abm/enrollment-abm.component';
import { EnrollmentComponent } from './dashboard/enrollment/enrollment.component';
import { EnrollmentDetailComponent } from './dashboard/enrollment-detail/enrollment-detail.component';
import { UsersAbmComponent } from './dashboard/users-abm/users-abm.component';
import { UsersComponent } from './dashboard/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentsAbmComponent,
    CoursesComponent,
    CoursesAbmComponent,
    EnrollmentAbmComponent,
    EnrollmentComponent,
    EnrollmentDetailComponent,
    UsersAbmComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
