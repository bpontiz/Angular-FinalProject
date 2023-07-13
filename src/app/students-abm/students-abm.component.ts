import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Student } from '../students/model/student.model';


interface StudentModel {
  id: FormControl <string | null>;
  studentsurname: FormControl <string | null>;
  studentname: FormControl <string | null>;
  course: FormControl <string | null>;
  email: FormControl <string | null>;
}

const ELEMENT_DATA: Student[] = [];


@Component({
  selector: 'app-students-abm',
  templateUrl: './students-abm.component.html',
  styleUrls: ['./students-abm.component.scss']
})
export class StudentsAbmComponent {
  constructor(private fb: FormBuilder) {}

  public students: Student[] = ELEMENT_DATA;

  validateRequired = Validators.required;

  student_name_control = new FormControl('', [ this.validateRequired, Validators.minLength(3) ]);

  student_surname_control = new FormControl('', [ this.validateRequired, Validators.minLength(3) ]);

  email = new FormControl('', [ this.validateRequired, Validators.email ]);

  id = new FormControl('', [ this.validateRequired ]);

  course = new FormControl('', [ this.validateRequired ]);

  studentModel: FormGroup <StudentModel> = new FormGroup(
    {
      id: this.id,
      studentsurname: this.student_surname_control,
      studentname: this.student_name_control,
      course: this.course,
      email: this.email
    }
  );

  getErrorMessage(control: FormControl <string | null>) {
    if(control.hasError('required')) {
      return 'You must enter a value';
    };

    if(control.hasError('minlength')) {
      return 'Enter at least 3 characters';
    };

    if (control.hasError('email')) {
      return 'Not a valid email';
    } else {
      return '';
    };
  };

  onSubmit(): void {
    this.students = [
      ...this.students,
      {
        id: this.students.length + 1,
        name: this.student_name_control.value,
        surname: this.student_surname_control.value,
        email: this.email.value,
        course: this.course.value
      }
    ]
  };
}
