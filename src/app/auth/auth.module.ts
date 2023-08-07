import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
    FormsModule,
  ]
})
export class AuthModule { }
