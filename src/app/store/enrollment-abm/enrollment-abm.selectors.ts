import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollmentAbm from './enrollment-abm.reducer';

export const selectEnrollmentAbmState = createFeatureSelector<fromEnrollmentAbm.State>(
  fromEnrollmentAbm.enrollmentAbmFeatureKey
);

export const selectEnrollmentAbmStateValue = createSelector(selectEnrollmentAbmState, (state) => state.enrollments);