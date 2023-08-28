import { createReducer, on } from "@ngrx/store";
import { CounterCourseActions } from "./counter.courses.actions";
import db from '../../../../db.json';

export const counterFeauterKey = 'counterCourse';

export interface CounterCourseState {
    value: number;
};

const initialCourseState = {
    value: db.courses.length
};

export const counterCourseReducer = createReducer(
    initialCourseState,

    on(CounterCourseActions.increaseCourseQuantity, (currentState) => {
        return {
            value: currentState.value + 1
        }
    }),

    on(CounterCourseActions.decreaseCourseQuantity, (currentState) => {
        return {
            value: currentState.value - 1
        }
    }),
)