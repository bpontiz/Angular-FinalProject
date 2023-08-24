import { createActionGroup, emptyProps } from "@ngrx/store";

export const CounterCourseActions = createActionGroup({
    source: 'CounterCourse',
    events: {
        increaseCourseQuantity: emptyProps(),
        decreaseCourseQuantity: emptyProps()
    }
});