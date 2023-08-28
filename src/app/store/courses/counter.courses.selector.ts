import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterCourseState, counterFeauterKey } from "./counter.courses.reducer";

export const selectCounterCourseState = createFeatureSelector<CounterCourseState>(counterFeauterKey);

export const selectCounterCourseStateValue = createSelector(
    selectCounterCourseState,
    (state) => state.value
)