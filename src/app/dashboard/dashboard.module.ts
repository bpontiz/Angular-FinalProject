import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeComponent } from './home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
    declarations: [
    HomeComponent,
    DashboardComponent
  ],
    imports: [
      DashboardRoutingModule,
      CommonModule,
      MatIconModule,
      MatButtonModule,
      MatToolbarModule,
      MatSidenavModule,
      MatSelectModule,
      RouterModule, 
    ]
})
export class DashboardModule { }