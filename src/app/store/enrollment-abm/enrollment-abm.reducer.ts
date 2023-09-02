import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentAbmActions } from './enrollment-abm.actions';
import { Enrollment } from 'src/app/dashboard/enrollment/model/enrollment.model';
import db from '../../../../db.json';

export const enrollmentAbmFeatureKey = 'enrollmentAbm';

export interface State {
  enrollments: Enrollment[];
  enrollmentDetail: Enrollment | null;
};

export const initialState: State = {
  enrollments: [],
  enrollmentDetail: null
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentAbmActions.loadEnrollmentAbms, state => {
    return {
      enrollments: db.enrollments,
      enrollmentDetail: state.enrollmentDetail
    };
  }),

  on(EnrollmentAbmActions.loadEnrollmentDetail, (state, action) => {
    return {
      ...state,
      enrollmentDetail: db.enrollments.find( c => c.id == action.enrollment_id ) || null
    }
  })

);

export const enrollmentAbmFeature = createFeature({
  name: enrollmentAbmFeatureKey,
  reducer,
});

