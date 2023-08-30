import { createActionGroup, emptyProps } from "@ngrx/store";

export const CounterEnrollmentActions = createActionGroup({
    source: 'CounterEnrollment',
    events: {
        increaseEnrollmentQuantity: emptyProps(),
        decreaseEnrollmentQuantity: emptyProps()
    }
});