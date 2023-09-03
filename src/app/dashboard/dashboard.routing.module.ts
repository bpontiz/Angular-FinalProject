import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoursesAbmComponent } from "./courses-abm/courses-abm.component";
import { HomeComponent } from "./home/home.component";
import { StudentsAbmComponent } from "./students-abm/students-abm.component";
import { EnrollmentAbmComponent } from "./enrollment-abm/enrollment-abm.component";
import { EnrollmentDetailComponent } from "./enrollment-detail/enrollment-detail.component";
import { UsersAbmComponent } from "./users-abm/users-abm.component";
import { adminGuard } from "../auth/guards/admin.guard";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'home', component: HomeComponent },
            { path: 'students-abm', component: StudentsAbmComponent },
            { path: 'courses-abm', component: CoursesAbmComponent },
            { path: 'enrollment-abm', component: EnrollmentAbmComponent },
            { path: 'enrollment-abm/:id', component: EnrollmentDetailComponent },
            { path: 'users-abm', canActivate: [adminGuard], component: UsersAbmComponent, loadChildren: () => import('./users-abm/users-abm.module').then( tsModule => tsModule.UsersAbmModule) },
            { path: '**', redirectTo: '/dashboard/home' }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}