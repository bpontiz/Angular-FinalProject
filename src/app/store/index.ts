import { ActionReducerMap } from "@ngrx/store";
import { counterStudentReducer } from "./students/counter.students.reducer";
import { counterCourseReducer } from "./courses/counter.courses.reducer";
import { authReducer } from "./auth/auth.reducer";
import { counterEnrollmentReducer } from "./enrollments/counter.enrollments.reducer";
import { reducer as enrollmentReducer } from "./enrollment-abm/enrollment-abm.reducer";

export const appReducer: ActionReducerMap<any> = {
    counterStudent: counterStudentReducer,
    counterCourse: counterCourseReducer,
    counterEnrollment: counterEnrollmentReducer,
    enrollment: enrollmentReducer,
    authUser: authReducer,
};