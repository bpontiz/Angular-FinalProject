import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterFeauterKey } from "./counter.students.reducer";

export const selectCounterStudentState = createFeatureSelector(counterFeauterKey);

export const selectCounterStudentStateValue = createSelector(
    selectCounterStudentState,
    (state: any) => state.value
)