import { Injectable } from '@angular/core';
import { Student } from '../students/model/student.model';
import { BehaviorSubject, Observable, Subject, delay, of, take } from 'rxjs';

const students_db: Observable<Student[]> = of([
  {id: 100000000001, name: 'PAT', surname: 'MCMILLAN', email: 'pat@example.com', course: 'Angular'},
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class StudentsAbmService {
  constructor() { }

  private _students$ = new BehaviorSubject<Student[]>([]);

  private students$ = this._students$.asObservable();

  loadStudents(): void {
    students_db.subscribe({
      next: (studentsFromDb) => this._students$.next(studentsFromDb)
    });    
  };

  getStudents(): Observable<Student[]> {
    return this.students$;
  };

  addStudent(newStudent: Student): void {
    this.students$.pipe(take(1)).subscribe({
      next: (oldCollection) => {
        this._students$.next([
          ...oldCollection,
          {
            ...newStudent,
            id: Math.round(Date.now() * Math.random() * 100)
          }
        ]);
      }
    })
  }

  deleteStudent(studentToDelete: Student): void {
    const confirmAction: boolean = confirm(
      `Are you sure you want to delete student ${studentToDelete.name?.toUpperCase()} ${studentToDelete.surname?.toUpperCase()} ?`);

    if (confirmAction) {
      this.students$.pipe(take(1)).subscribe({
        next: (oldCollection) => {
          this._students$.next(
            oldCollection.filter( item => item.id !== studentToDelete.id)
          )
        }
      })
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
            const editEmail: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student email: `);

            if (editEmail) {
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