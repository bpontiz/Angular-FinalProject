import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterEnrollmentState, counterFeauterKey } from "./counter.enrollments.reducer";

export const selectCounterEnrollmentState = createFeatureSelector<CounterEnrollmentState>(counterFeauterKey);

export const selectCounterEnrollmentStateValue = createSelector(
    selectCounterEnrollmentState,
    (state) => state.value
)