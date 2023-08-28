import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterStudentState, counterFeauterKey } from "./counter.students.reducer";

export const selectCounterStudentState = createFeatureSelector<CounterStudentState>(counterFeauterKey);

export const selectCounterStudentStateValue = createSelector(
    selectCounterStudentState,
    (state) => state.value
)