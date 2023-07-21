import { Injectable } from '@angular/core';
import { Student } from '../students/model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsAbmService {
  constructor() { }

  private students = [];

  getStudents(): Student[] {
    return this.students;
  }
}
