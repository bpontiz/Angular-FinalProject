import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoursesAbmComponent } from "./courses-abm/courses-abm.component";
import { HomeComponent } from "./home/home.component";
import { StudentsAbmComponent } from "./students-abm/students-abm.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'home', component: HomeComponent },
            { path: 'students-abm', component: StudentsAbmComponent },
            { path: 'courses-abm', component: CoursesAbmComponent },
            { path: '**', redirectTo: '/dashboard/home' }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}