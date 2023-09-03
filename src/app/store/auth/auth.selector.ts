import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const counterFeauterKey = 'authUser';

export const selectAuthState = createFeatureSelector<AuthState>(counterFeauterKey);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);

export const selectAuthUserRole = createSelector(selectAuthState, (state) => state.authUser?.role);