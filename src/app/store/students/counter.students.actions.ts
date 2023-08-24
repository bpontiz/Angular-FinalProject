import { createActionGroup, emptyProps } from "@ngrx/store";

export const CounterStudentActions = createActionGroup({
    source: 'CounterStudent',
    events: {
        increaseStudentQuantity: emptyProps(),
        decreaseStudentQuantity: emptyProps()
    }
});