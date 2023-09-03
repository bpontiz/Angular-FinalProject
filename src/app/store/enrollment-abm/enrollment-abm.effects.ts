import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EnrollmentAbmActions } from './enrollment-abm.actions';
import { HttpClient } from '@angular/common/http';
import { Enrollment } from 'src/app/dashboard/enrollment/model/enrollment.model';

@Injectable()
export class EnrollmentAbmEffects {
  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  loadEnrollmentAbms$ = createEffect(() => {
    return this.actions$.pipe(
      
      ofType(EnrollmentAbmActions.loadEnrollmentAbms),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => this.getEnrollmentsFromDB().pipe(
        map(() => EnrollmentAbmActions.loadEnrollmentAbms()),
        catchError(() => of(EnrollmentAbmActions.loadEnrollmentAbms()))
      ))
      );
    });
    
    
    private getEnrollmentsFromDB(): Observable<Enrollment> {
      return this.httpClient.get<Enrollment>('http://localhost:3000/enrollments');
  };
}
