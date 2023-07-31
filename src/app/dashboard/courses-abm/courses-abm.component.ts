import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../courses/model/courses.model';
import { CoursesAbmService } from '../services/courses-abm/courses-abm.service';
import { Observable } from 'rxjs';

interface CourseModel {
  id: FormControl <string | null>;
  courseName: FormControl <string | null>;
  type: FormControl <string | null>;
  credits: FormControl <string | null>;
};

interface CourseType {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-courses-abm',
  templateUrl: './courses-abm.component.html',
  styleUrls: ['./courses-abm.component.scss']
})
export class CoursesAbmComponent {
  constructor(private fb: FormBuilder, private courseService: CoursesAbmService) {
    this.courseService.loadCourses();

    this.courses = this.courseService.getCourses();
  }

  public courses: Observable<Course[]>;

  id_control = new FormControl('', [Validators.required]);

  courseName_control = new FormControl('', [Validators.required]);

  type_control = new FormControl('', [Validators.required]);

  credits_control = new FormControl('', [Validators.required, Validators.max(10), Validators.min(1)]);

  courseModel: FormGroup <CourseModel> = new FormGroup(
    {
      id: this.id_control,
      courseName: this.courseName_control,
      type: this.type_control,
      credits: this.credits_control
    }
  );

  types: CourseType[] = [
    {value: 'FP', viewValue: '(FP) First Period'},
    {value: 'SP', viewValue: '(SP) Second Period'},
    {value: 'A', viewValue: '(A) Annually'},
  ];

  getErrorMessage(control: FormControl <string | null>) {
    if(control.hasError('required')) {
      return 'You must enter a value';
    };

    if(control.hasError('max') || control.hasError('min')) {
      return 'You must choose between 1-10'
    };

    return '';
  };

  onSubmit(): void {
    this.courseService.addCourse(
      {
        id: 1,
        courseName: this.courseName_control.value,
        type: this.type_control.value,
        credits: this.credits_control.value
      }
    );
  };

  onDeleteCourse(deleteCourse: Course): void {
    this.courseService.deleteCourse(deleteCourse);
  };

  onEditCourse(editCourse: Course): void {    
    this.courseService.editCourse(editCourse);
  }
}
