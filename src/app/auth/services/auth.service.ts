import { Injectable } from "@angular/core";
import { LoginPayload } from "../model/auth.login.model";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { Router } from "@angular/router";
import { User } from "src/app/dashboard/users/model/users.model";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AuthActions } from "src/app/store/auth/auth.actions";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private store: Store
    ) {}

    public _authService$ = new BehaviorSubject<LoginPayload | null>(null);

    public authService$ = this._authService$.asObservable();

    login(payload: LoginPayload): void {
        this.httpClient.get<User[]>('http://localhost:3000/users', {
            params: {
                email: payload.email || '',
                password: payload.password || ''
            }
        }).subscribe({
            next: response => {
                if (response.length) {
                    const authUser = response[0];

                    this._authService$.next(authUser);

                    this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }));

                    this.router.navigate(['/dashboard']);

                    localStorage.setItem('token', authUser.token);
                } else {
                    alert("Email or password are incorrect.");

                    this._authService$.next(null);

                    this.store.dispatch(AuthActions.setAuthUser({ payload: null }));
                }
            },
            error: () => alert("Json Server is not running at the moment.\nTry later.")
        });
    };

    isAuthenticated(): Observable<boolean> {
        return this.httpClient.get<User[]>('http://localhost:3000/users', {
            params: {
                token: localStorage.getItem('token') || ''
            }
        })
        .pipe(
            map(userResult => {
                if (userResult.length) {
                    const authUser = userResult[0];

                    this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }));
                }

                return !!userResult.length;
            })
        )
    }

    public logout(): void {
        this.store.dispatch(AuthActions.setAuthUser({ payload: null }));
    }
}; 