import { Injectable } from "@angular/core";
import { LoginPayload } from "../model/auth.login.model";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private router: Router) {}

    public _authService$ = new BehaviorSubject<LoginPayload | null>(null);

    public authService$ = this._authService$.asObservable();

    login(payload: LoginPayload): void {
        const mockUser: LoginPayload = {
            username: 'Admin',
            email: 'admin@admin',
            password: '1234'
        };

        if (payload.email === mockUser.email && payload.password === mockUser.password) {
            this._authService$.next(mockUser);

            this.router.navigate(['/dashboard']);
        }
        else {
            alert("No account matches entered data.")
            this._authService$.next(null);
        };
    };

    isAuthenticated(): Observable<boolean> {
        return this.authService$.pipe(
            take(1),
            map( user => user ? true : false ))
    }
}; 