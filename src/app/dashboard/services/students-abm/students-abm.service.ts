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
      },
      error: () => alert("Loading students ERROR!")
    });
  };

  getStudents(): Observable<Student[]> {
    return this.students$;
  };

  addStudent(newStudent: Student): void {
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
      this.httpClient.delete(`http://localhost:3000/students/${studentToDelete.id}`)
        .pipe(
          mergeMap(
            () => this.students$.pipe(
              take(1),
              map(newCollection => newCollection.filter(
                student => student.id !== studentToDelete.id
              ))
            )
          )
        )
        .subscribe({
          next: newCollection => this._students$.next(newCollection)
        });
    };
  };

  editStudent(studentToEdit: Student): void {
    this.students$.pipe(take(1)).subscribe({
      next: () => {
        const editAction = prompt(
          `--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nChoose one to update:\n(1) Name\n(2) Surname\n(3) Email\n(4) Course\n(5) Press any key to cancel`
        );
        switch (editAction) {
          case '1':
            const editName: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student name: `);

            if (editName) {
              studentToEdit.name = editName;

              this.httpClient.put<Student[]>(`http://localhost:3000/students/${studentToEdit.id}`, studentToEdit)
                .subscribe({
                  next: () => this.loadStudents()
                })
            }
            
            break;

          case '2':
            const editSurname: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student surname: `);

            if (editSurname) {
              studentToEdit.surname = editSurname;

              this.httpClient.put<Student[]>(`http://localhost:3000/students/${studentToEdit.id}`, studentToEdit)
                .subscribe({
                  next: () => this.loadStudents()
                })
            }
            
            break;

          case '3':
            let editEmail: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student email: `);

            while(!editEmail?.includes('@')) {
              editEmail = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\n You must enter a valid email. New student surname: `);
            };

            if (editEmail.includes('@')) {
              studentToEdit.email = editEmail;

              this.httpClient.put<Student[]>(`http://localhost:3000/students/${studentToEdit.id}`, studentToEdit)
                .subscribe({
                  next: () => this.loadStudents()
                })
            }
            
            break;

          case '4':
            const editCourse: string | null = prompt(`--------------\nEditing ${studentToEdit.name?.toUpperCase()} ${studentToEdit.surname?.toUpperCase()}\nNew student course: `);

            if (editCourse) {
              studentToEdit.course = editCourse;

              this.httpClient.put<Student[]>(`http://localhost:3000/students/${studentToEdit.id}`, studentToEdit)
                .subscribe({
                  next: () => this.loadStudents()
                })
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