import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EnrollmentAbmEffects } from '../../store/enrollment-abm/enrollment-abm.effects';
import { enrollmentAbmFeature } from 'src/app/store/enrollment-abm/enrollment-abm.reducer';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature(enrollmentAbmFeature),
    EffectsModule.forFeature([EnrollmentAbmEffects])
  ]
})
export class EnrollmentAbmModule { }
