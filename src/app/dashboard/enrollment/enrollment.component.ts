import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Enrollment } from "./model/enrollment.model";


@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent {
    displayedColumns: string[] = ['edit', 'id', 'student_id', 'student_fullname', 'student_course'];
    
    @Input()
    dataSource: Enrollment[] = [];

    @Output()
    deleteEnrollment = new EventEmitter<Enrollment>();
    
    @Output()
    editEnrollment = new EventEmitter<Enrollment>();
}