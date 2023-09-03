import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from './model/student.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin);
  };

  public isAdmin$: Observable<boolean>;

  displayedColumns: string[] = ['edit', 'id', 'name', 'email'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();
  
  @Output()
  editStudent = new EventEmitter<Student>();
}
