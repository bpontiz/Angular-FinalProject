import { TestBed } from "@angular/core/testing"
import { AuthComponent } from "./auth.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

describe('AuthComponent', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule]
        })
    });
    
    
    it('form should be invalid if any of text fields is empty', () => {
        let component: AuthComponent;

        component = TestBed.createComponent(AuthComponent).componentInstance;

        component.email.setValue('');

        component.password.setValue('');

        expect(component.loginForm.invalid).toBeTruthy();
    });

})