import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/students/model/student.model';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(student: Student, ...args: unknown[]): unknown {
    const isUppercase = args[0] === 'uppercase';

    const fullname = `${student.name} ${student.surname}`;

    return isUppercase ? fullname.toUpperCase() : fullname;
  };
}
