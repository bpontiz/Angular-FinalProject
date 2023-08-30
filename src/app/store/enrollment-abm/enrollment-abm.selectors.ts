import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollmentAbm from './enrollment-abm.reducer';

export const selectEnrollmentAbmState = createFeatureSelector<fromEnrollmentAbm.State>(
  fromEnrollmentAbm.enrollmentAbmFeatureKey
);
