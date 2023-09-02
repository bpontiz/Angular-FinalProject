import { Component, OnInit } from '@angular/core';
import { EnrollmentAbmService } from '../services/enrollment-abm/enrollment-abm.service';
import { ActivatedRoute } from '@angular/router';
import { Enrollment } from '../enrollment/model/enrollment.model';
import { Store } from '@ngrx/store';
import { EnrollmentAbmActions } from 'src/app/store/enrollment-abm/enrollment-abm.actions';
import { Observable } from 'rxjs';
import { selectEnrollmentDetailStateStudent } from 'src/app/store/enrollment-abm/enrollment-abm.selectors';

@Component({
  selector: 'app-enrollment-detail',
  templateUrl: './enrollment-detail.component.html',
  styleUrls: ['./enrollment-detail.component.scss']
})
export class EnrollmentDetailComponent implements OnInit {
  constructor(
    private enrollmentService: EnrollmentAbmService,
    private activatedRoute: ActivatedRoute,
    private store: Store
) {
  this.studentFullname$ = this.store.select(selectEnrollmentDetailStateStudent);
  
}

  displayedColumns: string[] = ['id', 'student_id', 'student_fullname', 'student_course', 'enrollment_timestamp'];

  enrollments: Enrollment[] = [];

  studentFullname$: Observable<string | undefined | null>;

  ngOnInit(): void {
    this.store.dispatch(EnrollmentAbmActions.loadEnrollmentDetail({enrollment_id: this.activatedRoute.snapshot.params['id'] }));

    this.enrollmentService.getEnrollmentById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: enrollments => {this.enrollments = enrollments}
    })
  };

};
