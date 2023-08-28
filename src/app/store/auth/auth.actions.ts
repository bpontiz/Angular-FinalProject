import { createActionGroup, props } from "@ngrx/store";
import { User } from "src/app/dashboard/users/model/users.model";


export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'setAuthUser': props<{ payload: User | null}>()
    }
});