import { createReducer, on } from "@ngrx/store";
import { CounterEnrollmentActions } from "./counter.enrollments.actions";
import db from '../../../../db.json';

export const counterFeauterKey = 'counterEnrollment';

export interface CounterEnrollmentState {
    value: number;
};

const initialEnrollmentState = {
    value: db.enrollments.length
};

export const counterEnrollmentReducer = createReducer(
    initialEnrollmentState,

    on(CounterEnrollmentActions.increaseEnrollmentQuantity, (currentState) => {
        return {
            value: currentState.value + 1
        }
    }),

    on(CounterEnrollmentActions.decreaseEnrollmentQuantity, (currentState) => {
        return {
            value: currentState.value - 1
        }
    }),
);