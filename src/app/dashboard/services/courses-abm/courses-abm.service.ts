import { Injectable } from '@angular/core';
import { Course } from '../../courses/model/courses.model';
import { BehaviorSubject, Observable, Subject, delay, of, take } from 'rxjs';

const courses_db: Observable<Course[]> = of([
  {id: 1000000001, courseName: 'TypeScript', type: 'FP', credits: '5'},
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class CoursesAbmService {
  constructor() { }

  private _courses$ = new BehaviorSubject<Course[]>([]);

  private courses$ = this._courses$.asObservable();

  loadCourses(): void {
    courses_db.subscribe({
      next: (coursesFromDb) => this._courses$.next(coursesFromDb)
    });
  };

  getCourses(): Observable<Course[]> {
    return this.courses$;
  };

  addCourse(newCourse: Course): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (oldCollection) => {
        this._courses$.next([
          ...oldCollection,
          {
            ...newCourse,
            id: Math.round(Date.now() * Math.random() * 100)
          }
        ]);
      }
    })
  };

  deleteCourse(courseToDelete: Course): void {
    const confirmAction: boolean = confirm(
      `Are you sure you want to delete course ${courseToDelete.courseName?.toUpperCase()}?`);

    if (confirmAction) {
      this.courses$.pipe(take(1)).subscribe({
        next: (oldCollection) => {
          this._courses$.next(
            oldCollection.filter( item => item.id !== courseToDelete.id)
          )
        }
      })
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

              this._courses$.next(
                oldCollection.map( el => ({
                  ...el,
                  courseToEdit
                }))
              );
            }
            
            break;

          case '2':
            const editType: string | null = prompt(`--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nNew course type: `);

            if (editType) {
              courseToEdit.type = editType;

              this._courses$.next(
                oldCollection.map( el => ({
                  ...el,
                  courseToEdit
                }))
              );
            }
            
            break;

          case '3':
            let editCredits: number | null = Number(prompt(`--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nNew course credits: `));

            while(editCredits < 1 || editCredits > 10) {
              editCredits = Number(prompt(`--------------\nEditing ${courseToEdit.courseName?.toUpperCase()}\nYou must choose between 1-10. New course credits: `));
            };

            if (editCredits > 0 && editCredits < 11) {
              courseToEdit.credits = String(editCredits);

              this._courses$.next(
                oldCollection.map( el => ({
                  ...el,
                  courseToEdit
                }))
              );
            }

            // if (editCredits) {
            //   courseToEdit.credits = String(editCredits);

            //   this._courses$.next(
            //     oldCollection.map( el => ({
            //       ...el,
            //       courseToEdit
            //     }))
            //   );
            // }
            
            break;


            default:
              return this.courses$;
        };

        return this.courses$;
      }
    });
  }
}
