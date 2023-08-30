import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from './model/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  displayedColumns: string[] = ['edit', 'id', 'name', 'email'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<Student>();
  
  @Output()
  editStudent = new EventEmitter<Student>();
}
