import { ActionReducerMap } from "@ngrx/store";
import { counterStudentReducer } from "./students/counter.students.reducer";
import { counterCourseReducer } from "./courses/counter.courses.reducer";
import { authReducer } from "./auth/auth.reducer";

export const appReducer: ActionReducerMap<any> = {
    counterStudent: counterStudentReducer,
    counterCourse: counterCourseReducer,
    authUser: authReducer
};