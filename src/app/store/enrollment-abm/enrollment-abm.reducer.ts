import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentAbmActions } from './enrollment-abm.actions';

export const enrollmentAbmFeatureKey = 'enrollmentAbm';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(EnrollmentAbmActions.loadEnrollmentAbms, state => state),

);

export const enrollmentAbmFeature = createFeature({
  name: enrollmentAbmFeatureKey,
  reducer,
});

