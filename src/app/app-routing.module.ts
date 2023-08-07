import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module')
      .then( tsModule => tsModule.AuthModule),
  },
  { path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module')
      .then( tsModule => tsModule.DashboardModule),
  },
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
