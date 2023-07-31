import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../students/model/student.model';
import { StudentsAbmService } from '../services/students-abm/students-abm.service';
import { Observable, Subject } from 'rxjs';


interface StudentModel {
  id: FormControl <string | null>;
  studentsurname: FormControl <string | null>;
  studentname: FormControl <string | null>;
  course: FormControl <string | null>;
  email: FormControl <string | null>;
}

@Component({
  selector: 'app-students-abm',
  templateUrl: './students-abm.component.html',
  styleUrls: ['./students-abm.component.scss']
})
export class StudentsAbmComponent implements OnDestroy {
  constructor(private fb: FormBuilder, private studentService: StudentsAbmService) {
    this.studentService.loadStudents();

    this.students = this.studentService.getStudents();
  };

  ngOnDestroy(): void {
    this.destroyed.next(true);
  };

  public students: Observable<Student[]>;

  public destroyed = new Subject<boolean>();

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

    return control.hasError('email') ? 'Not a valid email' : '';
  };

  onSubmit(): void {
    this.studentService.addStudent(
      {
        id: 1,
        name: this.student_name_control.value,
        surname: this.student_surname_control.value,
        email: this.email.value,
        course: this.course.value
      }
    );
  }

  onDeleteStudent(deleteStudent: Student): void {
    this.studentService.deleteStudent(deleteStudent);
  };

  onEditStudent(editStudent: Student): void {    
    this.studentService.editStudent(editStudent);
  }
}