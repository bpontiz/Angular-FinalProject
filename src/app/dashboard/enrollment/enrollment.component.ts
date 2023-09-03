import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Enrollment } from "./model/enrollment.model";
import { Store } from "@ngrx/store";
import { selectIsAdmin } from "src/app/store/auth/auth.selector";
import { Observable } from "rxjs";


@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent {
    constructor(private store: Store) {
        this.isAdmin$ = this.store.select(selectIsAdmin)
    };

    public isAdmin$: Observable<boolean>;

    displayedColumns: string[] = ['edit', 'id', 'student_id', 'student_fullname', 'student_course'];
    
    @Input()
    dataSource: Enrollment[] = [];

    @Output()
    deleteEnrollment = new EventEmitter<Enrollment>();
    
    @Output()
    editEnrollment = new EventEmitter<Enrollment>();
}