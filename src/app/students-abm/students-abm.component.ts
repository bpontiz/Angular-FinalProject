import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Student } from '../students/model/student.model';
import { StudentsAbmService } from './students-abm.service';


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
export class StudentsAbmComponent {
  constructor(private fb: FormBuilder, private studentService: StudentsAbmService) {
    this.students = this.studentService.getStudents();
  }

  public students: Student[] = [];

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

  onDeleteStudent(deleteStudent: Student): void {
    const confirmAction: boolean = confirm(
      `Are you sure you want to delete student ${deleteStudent.name} ${deleteStudent.surname} ?`);

    if (confirmAction) {
      this.students = this.students.filter( element => element.id !== deleteStudent.id);
    }
  };

  onEditStudent(editStudent: Student): void {    
    const editAction = prompt(
      `Choose one to update:\n(1) Name\n(2) Surname\n(3) Email\n(4) Course\n(5) Press any key to cancel`
    );

    switch (editAction) {
      case '1':
        const editName: string | null = prompt('New student name: ');

        if (editName) {
          editStudent.name = editName;

          this.students = this.students.map( el => ({
            ...el,
            editStudent
          }));
        }
        
        break;

      case '2':
        const editSurname: string | null = prompt('New student surname: ');

        if (editSurname) {
          editStudent.surname = editSurname;

          this.students = this.students.map( el => ({
            ...el,
            editStudent
          }));
        }
        
        break;

      case '3':
        const editEmail: string | null = prompt('New student email: ');

        if (editEmail) {
          editStudent.email = editEmail;

          this.students = this.students.map( el => ({
            ...el,
            editStudent
          }));
        }
        
        break;

      case '4':
        const editCourse: string | null = prompt('New student course: ');

        if (editCourse) {
          editStudent.course = editCourse;

          this.students = this.students.map( el => ({
            ...el,
            editStudent
          }));
        }
        
        break;
    }
  };
}
