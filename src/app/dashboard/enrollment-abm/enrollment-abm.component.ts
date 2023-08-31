import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Enrollment } from '../enrollment/model/enrollment.model';
import db from '../../../../db.json';
import { EnrollmentAbmService } from '../services/enrollment-abm/enrollment-abm.service';
import { CounterEnrollmentActions } from 'src/app/store/enrollments/counter.enrollments.actions';
import { EnrollmentAbmActions } from 'src/app/store/enrollment-abm/enrollment-abm.actions';
import { selectEnrollmentAbmStateValue } from 'src/app/store/enrollment-abm/enrollment-abm.selectors';


interface EnrollmentModel {
  id: FormControl<string | null>;
  student_id: FormControl<string | null>;
  student_fullname: FormControl<string | null>;
  student_course: FormControl<string | null>;
  enrollment_timestamp: FormControl<string | null>
};

interface EnrollmentType {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-enrollment-abm',
  templateUrl: './enrollment-abm.component.html',
  styleUrls: ['./enrollment-abm.component.scss']
})
export class EnrollmentAbmComponent implements OnDestroy, OnInit {
  constructor(
    private fb: FormBuilder,
    private enrollmentService: EnrollmentAbmService,
    private store: Store
  ) {
    this.enrollmentService.loadEnrollment();

    this.enrollment = this.enrollmentService.getEnrollment();

    this.enrollments$ = this.store.select(selectEnrollmentAbmStateValue);
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  };

  ngOnInit(): void {
    this.store.dispatch(EnrollmentAbmActions.loadEnrollmentAbms());
  };

  public enrollments$: Observable<Enrollment[]>;

  public enrollment: Observable<Enrollment[]>;

  public destroyed = new Subject<boolean>();

  validateRequired = Validators.required;

  id = new FormControl('', [ this.validateRequired ]);

  student_fullname = new FormControl('', [ this.validateRequired ]);

  student_course = new FormControl('', [ this.validateRequired ]);

  enrollment_timestamp = new FormControl('', [ this.validateRequired ]);

  student_id = new FormControl('', [ this.validateRequired ]);

  enrollmentModel: FormGroup <EnrollmentModel> = new FormGroup(
    {
      id: this.id,
      student_id: this.student_id,
      student_fullname: this.student_fullname,
      student_course: this.student_course,
      enrollment_timestamp: this.enrollment_timestamp
    }
  );

  public courses = db.courses.map((course) => (
    {
      value: course.courseName,
      viewValue: course.courseName
    }
  ));

  public students = db.students.map((student) => (
    {
      value: `${student.name} ${student.surname}`,
      viewValue: `${student.name} ${student.surname}`
    }
  ));

  types: EnrollmentType[] = this.courses;

  studentsTypes: EnrollmentType[] = this.students;

  getErrorMessage(control: FormControl <string | null>) {
    return control.hasError('required') ? 'You must enter a value.' : '';

  };

  onSubmit(): void {
    this.enrollmentService.addEnrollment(
      {
        id: 0,
        student_id: 0,
        student_fullname: this.student_fullname.value,
        student_course: this.student_course.value,
        enrollment_timestamp: new Date().toLocaleString()
      }
    );

    this.store.dispatch(CounterEnrollmentActions.increaseEnrollmentQuantity());

  };

  onDeleteEnrollment(deleteEnrollment: Enrollment): void {
    this.enrollmentService.deleteEnrollment(deleteEnrollment);

    this.store.dispatch(CounterEnrollmentActions.decreaseEnrollmentQuantity());
  };

  onEditEnrollment(editEnrollment: Enrollment): void {    
    this.enrollmentService.editEnrollment(editEnrollment);
  };
}
