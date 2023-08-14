import { Injectable } from '@angular/core';
import { Course } from '../../courses/model/courses.model';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CoursesAbmService {
  constructor(private httpClient: HttpClient) { }

  private _courses$ = new BehaviorSubject<Course[]>([]);

  private courses$ = this._courses$.asObservable();

  loadCourses(): void {
    this.httpClient.get<Course[]>('http://localhost:3000/courses').subscribe({
      next: response => {
        this._courses$.next(response);
      },
      error: () => alert("Loading courses ERROR!")
    });
  };

  getCourses(): Observable<Course[]> {
    return this.courses$;
  };

  addCourse(newCourse: Course): void {
    this.httpClient.post<Course>('http://localhost:3000/courses', newCourse)
      .pipe(
        mergeMap(courseToBeAdded => this.courses$.pipe(
          take(1),
          map(oldCollection => [...oldCollection, courseToBeAdded])
        ))
      )
      .subscribe({
        next: updatedCollection => {
          this._courses$.next(updatedCollection)
        }
      });
  };

  deleteCourse(courseToDelete: Course): void {
    const confirmAction: boolean = confirm(
      `Are you sure you want to delete course ${courseToDelete.courseName?.toUpperCase()}?`);

    if (confirmAction) {
      this.httpClient.delete(`http://localhost:3000/courses/${courseToDelete.id}`)
        .pipe(
          mergeMap(
            () => this.courses$.pipe(
              take(1),
              map(newCollection => newCollection.filter(
                course => course.id !== courseToDelete.id
              ))
            )
          )
        )
        .subscribe({
          next: newCollection => this._courses$.next(newCollection)
        });
    };
  };

  editCourse(courseToEdit: Course): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (oldCollection) => {
        const editAction = prompt(
          `--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nChoose one to update:\n(1) Course name\n(2) Type\n(3) Credits\n(4) Press any key to cancel`
        );
        switch (editAction) {
          case '1':
            const editName: string | null = prompt(`--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nNew course name: `);

            if (editName) {
              courseToEdit.courseName = editName;

              this.httpClient.put<Course[]>(`http://localhost:3000/courses/${courseToEdit.id}`, courseToEdit)
                .subscribe({
                  next: () => this.loadCourses()
                })
            }
            
            break;

          case '2':
            const editType: string | null = prompt(`--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nNew course type: `);

            if (editType) {
              courseToEdit.type = editType;

              this.httpClient.put<Course[]>(`http://localhost:3000/students/${courseToEdit.id}`, courseToEdit)
                .subscribe({
                  next: () => this.loadCourses()
                })
            }
            
            break;

          case '3':
            let editCredits: number | null = Number(prompt(`--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nNew course credits: `));

            while(editCredits < 1 || editCredits > 10) {
              editCredits = Number(prompt(`--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nYou must choose between 1-10. New course credits: `));
            };

            if (editCredits > 0 && editCredits < 11) {
              courseToEdit.credits = String(editCredits);

              this.httpClient.put<Course[]>(`http://localhost:3000/students/${courseToEdit.id}`, courseToEdit)
                .subscribe({
                  next: () => this.loadCourses()
                })
            }
            
            break;


            default:
              return this.courses$;
        };

        return this.courses$;
      }
    });
  }
}