import { Injectable } from '@angular/core';
import { Student } from '../../students/model/student.model';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsAbmService {
  constructor(private httpClient: HttpClient) { }

  private _students$ = new BehaviorSubject<Student[]>([]);

  private students$ = this._students$.asObservable();

  loadStudents(): void {
    this.httpClient.get<Student[]>('http://localhost:3000/students').subscribe({
      next: response => {
        this._students$.next(response);
      }
    });
  };

  getStudents(): Observable<Student[]> {
    return this.students$;
  };

  addStudent(newStudent: Student): void {
    // this.students$.pipe(take(1)).subscribe({
    //   next: (oldCollection) => {
    //     this._students$.next([
    //       ...oldCollection,
    //       {
    //         ...newStudent,
    //         id: Math.round(Date.now() * Math.random() * 100)
    //       }
    //     ]);
    //   }
    // })

    this.httpClient.post<Student>('http://localhost:3000/students', newStudent)
      .pipe(
        mergeMap(studentToBeAdded => this.students$.pipe(
          take(1),
          map(oldCollection => [...oldCollection, studentToBeAdded])
        ))
      )
      .subscribe({
        next: updatedCollection => {
          this._students$.next(updatedCollection)
        }
      });
  };

  deleteStudent(studentToDelete: Student): void {
    const confirmAction: boolean = confirm(
      `Are you sure you want to delete student ${studentToDelete.name?.toUpperCase()} ${studentToDelete.surname?.toUpperCase()} ?`);

    if (confirmAction) {
      // this.students$.pipe(take(1)).subscribe({
      //   next: (oldCollection) => {
      //     this._students$.next(
      //       oldCollection.filter( item => item.email !== studentToDelete.email)
      //     )
      //   }
      // })

      // this.httpClient.delete(`http://localhost:3000/students/${id}`)
      //   .subscribe({
      //     next: studentDeleted => console.log(studentDeleted)          
      //   });
    };
  };

  editStudent(studentToEdit: Student): void {
    this.students$.pipe(take(1)).subscribe({
      next: (oldCollection) => {
        const editAction = prompt(
          `--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nChoose one to update:\n(1) Name\n(2) Surname\n(3) Email\n(4) Course\n(5) Press any key to cancel`
        );
        switch (editAction) {
          case '1':
            const editName: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student name: `);

            if (editName) {
              studentToEdit.name = editName;

              this._students$.next(
                oldCollection.map( el => ({
                  ...el,
                  studentToEdit
                }))
              );
            }
            
            break;

          case '2':
            const editSurname: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student surname: `);

            if (editSurname) {
              studentToEdit.surname = editSurname;

              this._students$.next(
                oldCollection.map( el => ({
                  ...el,
                  studentToEdit
                }))
              );
            }
            
            break;

          case '3':
            let editEmail: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student email: `);

            while(!editEmail?.includes('@')) {
              editEmail = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\n You must enter a valid email. New student surname: `);
            };

            if (editEmail.includes('@')) {
              studentToEdit.email = editEmail;

              this._students$.next(
                oldCollection.map( el => ({
                  ...el,
                  studentToEdit
                }))
              );
            }
            
            break;

          case '4':
            const editCourse: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student course: `);

            if (editCourse) {
              studentToEdit.course = editCourse;

              this._students$.next(
                oldCollection.map( el => ({
                  ...el,
                  studentToEdit
                }))
              );
            }
            
            break;

            default:
              return this.students$;
        };

        return this.students$;
      }
    });
  }
}