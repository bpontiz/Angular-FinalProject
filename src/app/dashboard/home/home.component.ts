import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCounterCourseStateValue } from 'src/app/store/courses/counter.courses.selector';
import { selectCounterStudentState, selectCounterStudentStateValue } from 'src/app/store/students/counter.students.selector';
import { CounterCourseActions } from 'src/app/store/courses/counter.courses.actions';
import { CounterStudentActions } from 'src/app/store/students/counter.students.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private store: Store) {
    this.store.select(selectCounterStudentStateValue).subscribe({
      next: e => {
        this.studentsQuantity = e;
      }
    });

    this.store.select(selectCounterCourseStateValue).subscribe({
      next: e => {
        this.coursesQuantity = e;
      }
    });
  }

  onIncreaseStudentQuantity(): void {
    this.store.dispatch(CounterStudentActions.increaseStudentQuantity())
  };

  onDecreaseStudentQuantity(): void {
    this.store.dispatch(CounterStudentActions.decreaseStudentQuantity())
  };

  onIncreaseCourseQuantity(): void {
    this.store.dispatch(CounterCourseActions.increaseCourseQuantity())
  };

  onDecreaseCourseQuantity(): void {
    this.store.dispatch(CounterCourseActions.decreaseCourseQuantity())
  };

  public studentsQuantity = 0;

  public coursesQuantity = 0;
}
