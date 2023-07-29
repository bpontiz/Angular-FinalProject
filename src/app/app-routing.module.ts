import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { StudentsAbmComponent } from './dashboard/students-abm/students-abm.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'students-abm', component: StudentsAbmComponent},
      { path: '**', redirectTo: '/dashboard/home' }
    ]
  },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
