import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentAbmActions } from './enrollment-abm.actions';
import { Enrollment } from 'src/app/dashboard/enrollment/model/enrollment.model';
import db from '../../../../db.json';

export const enrollmentAbmFeatureKey = 'enrollmentAbm';

export interface State {
  enrollments: Enrollment[];
};

export const initialState: State = {
  enrollments: []
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentAbmActions.loadEnrollmentAbms, state => {
    return {
      enrollments: db.enrollments
    };
  }),

);

export const enrollmentAbmFeature = createFeature({
  name: enrollmentAbmFeatureKey,
  reducer,
});

