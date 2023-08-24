import { createReducer, on } from "@ngrx/store";
import { CounterStudentActions } from "./counter.students.actions";
import db from '../../../../db.json';

export const counterFeauterKey = 'counterStudent';

const initialStudentState = {
    value: db.students.length
};

export const counterStudentReducer = createReducer(
    initialStudentState,

    on(CounterStudentActions.increaseStudentQuantity, (currentState) => {
        return {
            value: currentState.value + 1
        }
    }),

    on(CounterStudentActions.decreaseStudentQuantity, (currentState) => {
        return {
            value: currentState.value - 1
        }
    }),
);