import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const EnrollmentAbmActions = createActionGroup({
  source: 'EnrollmentAbm',
  events: {
    loadEnrollmentAbms: emptyProps(),
    loadEnrollmentDetail: props<{enrollment_id: number}>()
  }
});
