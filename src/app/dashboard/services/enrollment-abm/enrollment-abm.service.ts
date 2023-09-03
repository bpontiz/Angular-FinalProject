import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { Enrollment } from '../../enrollment/model/enrollment.model';
import db from '../../../../../db.json';
import { Student } from '../../students/model/student.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentAbmService {

  constructor(private httpClient: HttpClient) { }

  private _enrollment$ = new BehaviorSubject<Enrollment[]>([]);

  private enrollment$ = this._enrollment$.asObservable();

  public apiBaseUrl = 'http://localhost:3000/enrollments';

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

  getEnrollmentById(enrollmentId: number): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${this.apiBaseUrl}?student_id=${enrollmentId}`)
  };

  addEnrollment(newEnrollment: Enrollment): void {
    const getStudent: Student | undefined = db.students.find(
      student => `${student.name} ${student.surname}` === newEnrollment.student_fullname);

      if (getStudent) {
        const modifiedEnrollment = {
          ...newEnrollment,
          student_id: getStudent.id,
          student_fullname: newEnrollment.student_fullname?.toUpperCase() || null,
          student_course: newEnrollment.student_course?.toUpperCase() || null
        };

        const isEnrolled: Enrollment | undefined = db.enrollments.find(
          enroll => enroll.student_fullname === modifiedEnrollment.student_fullname &&
          enroll.student_course === modifiedEnrollment.student_course
        );

        if (!isEnrolled) {
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

            alert(`Enrollment successful.`);

        } else {

          confirm(`Student ${modifiedEnrollment.student_fullname} cannot be enrolled at ${modifiedEnrollment.student_course} again.`);

        }
      };
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

        alert(`Enrollment successfully deleted.`);

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
