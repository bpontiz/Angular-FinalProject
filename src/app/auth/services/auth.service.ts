import { Injectable } from "@angular/core";
import { LoginPayload } from "../model/auth.login.model";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { Router } from "@angular/router";
import { User } from "src/app/dashboard/users/model/users.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private router: Router, private httpClient: HttpClient) {}

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
                    this._authService$.next(response[0]);
                    this.router.navigate(['/dashboard'])
                } else {
                    alert("Email or password are incorrect.");
                    this._authService$.next(null);
                }
            }
        });
    };

    isAuthenticated(): Observable<boolean> {
        return this.authService$.pipe(
            take(1),
            map( user => user ? true : false ))
    }
}; 