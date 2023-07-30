import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink
  ]
})
export class AuthModule { }
