import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { Enrollment } from '../../enrollment/model/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentAbmService {

  constructor(private httpClient: HttpClient) { }

  private _enrollment$ = new BehaviorSubject<Enrollment[]>([]);

  private enrollment$ = this._enrollment$.asObservable();

  loadEnrollment(): void {
    this.httpClient.get<Enrollment[]>('http://localhost:3000/enrollments').subscribe({
      next: response => {
        this._enrollment$.next(response);
      },
      error: () => alert("Loading enrollments ERROR!")
    });
  };

  getEnrollment(): Observable<Enrollment[]> {
    return this.enrollment$;
  };

  addEnrollment(newEnrollment: Enrollment): void {
    const modifiedEnrollment = {
      ...newEnrollment,
      student_fullname: newEnrollment.student_fullname?.toUpperCase(),
      student_course: newEnrollment.student_course?.toUpperCase()
    };

    console.log("NEW ENROLLMENT", modifiedEnrollment);
    
    this.httpClient.post<Enrollment>('http://localhost:3000/enrollments', modifiedEnrollment)
      .pipe(
        mergeMap(enrollmentToBeAdded => this.enrollment$.pipe(
          take(1),
          map(oldCollection => [...oldCollection, enrollmentToBeAdded])
        ))
      )
      .subscribe({
        next: updatedCollection => {
          this._enrollment$.next(updatedCollection)
        }
      });
  };

  deleteEnrollment(enrollmentToDelete: Enrollment): void {
    const confirmAction: boolean = confirm(
      `Are you sure you want to delete student ${enrollmentToDelete.student_fullname?.toUpperCase()} ?`);

    if (confirmAction) {
      this.httpClient.delete(`http://localhost:3000/enrollments/${enrollmentToDelete.id}`)
        .pipe(
          mergeMap(
            () => this.enrollment$.pipe(
              take(1),
              map(newCollection => newCollection.filter(
                enrollment => enrollment.id !== enrollmentToDelete.id
              ))
            )
          )
        )
        .subscribe({
          next: newCollection => this._enrollment$.next(newCollection)
        });
    };
  };

  editEnrollment(enrollmentToEdit: Enrollment): void {
    this.enrollment$.pipe(take(1)).subscribe({
      next: () => {
        const editAction = prompt(
          `--------------\nEditing ${enrollmentToEdit.student_fullname?.toUpperCase()}\nChoose one to update:\n(1) Fullname\n(2) Course\n(3) Press any key to cancel`
        );
        switch (editAction) {
          case '1':
            const editFullName: string | null = prompt(`--------------\nEditing ${enrollmentToEdit.student_fullname?.toUpperCase()}\nNew student name: `);

            if (editFullName) {
              enrollmentToEdit.student_fullname = editFullName;

              this.httpClient.put<Enrollment[]>(`http://localhost:3000/enrollments/${enrollmentToEdit.id}`, enrollmentToEdit)
                .subscribe({
                  next: () => this.loadEnrollment()
                })
            }
            
            break;

          case '2':
            const editCourse: string | null = prompt(`--------------\nEditing ${enrollmentToEdit.student_fullname?.toUpperCase()}\nNew student course: `);

            if (editCourse) {
              enrollmentToEdit.student_course = editCourse;

              this.httpClient.put<Enrollment[]>(`http://localhost:3000/enrollments/${enrollmentToEdit.id}`, enrollmentToEdit)
                .subscribe({
                  next: () => this.loadEnrollment()
                })
            }
            
            break;

            default:
              return this.enrollment$;
        };

        return this.enrollment$;
      }
    });
  }

}
