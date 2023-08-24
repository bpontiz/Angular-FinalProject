import { ActionReducerMap } from "@ngrx/store";
import { counterReducer } from "./counter.reducer";

export const appReducer: ActionReducerMap<any> = {
    counter: counterReducer
}