import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterFeauterKey } from "./counter.courses.reducer";

export const selectCounterCourseState = createFeatureSelector(counterFeauterKey);

export const selectCounterCourseStateValue = createSelector(
    selectCounterCourseState,
    (state: any) => state.value
)