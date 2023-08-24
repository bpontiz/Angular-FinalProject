import { createReducer, on } from "@ngrx/store";
import { CounterActions } from "./counter.actions";
import db from '../../../db.json';

export const counterFeauterKey = 'counter';

const initialState = {
    value: db.students.length
};

export const counterReducer = createReducer(
    initialState,
    on(CounterActions.increase, (currentState) => {
        return {
            value: currentState.value + 1
        }
    }),
    on(CounterActions.decrease, (currentState) => {
        return {
            value: currentState.value - 1
        }
    })
);