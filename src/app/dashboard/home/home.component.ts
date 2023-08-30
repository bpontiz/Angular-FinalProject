import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCounterCourseStateValue } from 'src/app/store/courses/counter.courses.selector';
import { selectCounterStudentStateValue } from 'src/app/store/students/counter.students.selector';
import { selectCounterEnrollmentStateValue } from 'src/app/store/enrollments/counter.enrollments.selector';
import { CounterCourseActions } from 'src/app/store/courses/counter.courses.actions';
import { CounterStudentActions } from 'src/app/store/students/counter.students.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private store: Store) {

    this.studentsQuantity$ = this.store.select(selectCounterStudentStateValue);

    this.coursesQuantity$ = this.store.select(selectCounterCourseStateValue);

    this.enrollmentsQuantity$ = this.store.select(selectCounterEnrollmentStateValue);
    
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

  public studentsQuantity$: Observable<number>;

  public coursesQuantity$: Observable<number>;

  public enrollmentsQuantity$: Observable<number>;

}
