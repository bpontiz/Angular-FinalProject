import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FontSizingDirective } from './directives/font-sizing.directive';
import { FullnamePipe } from './pipes/fullname.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        FullnamePipe
    ],
    declarations: [
        FontSizingDirective,
        FullnamePipe
    ]
})

export class SharedModule { }