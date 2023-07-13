import { Component, Input } from '@angular/core';
import { Student } from './model/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'course'];

  @Input()
  dataSource: Student[] = [];
}
