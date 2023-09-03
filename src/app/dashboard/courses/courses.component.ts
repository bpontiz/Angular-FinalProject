import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from './model/courses.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  }

  public isAdmin$: Observable<boolean>;

  displayedColumns: string[] = ['edit', 'id', 'courseName', 'type', 'credits'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();
  
  @Output()
  editCourse = new EventEmitter<Course>();
}
