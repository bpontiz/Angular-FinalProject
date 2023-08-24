import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterFeauterKey } from "./counter.reducer";


export const selectCounterState = createFeatureSelector(counterFeauterKey);

export const selectCounterStateValue = createSelector(
    selectCounterState,
    (state: any) => state.value
)