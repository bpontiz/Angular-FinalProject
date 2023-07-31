import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from './model/courses.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  displayedColumns: string[] = ['edit', 'id', 'courseName', 'type', 'credits'];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();
  
  @Output()
  editCourse = new EventEmitter<Course>();
}
