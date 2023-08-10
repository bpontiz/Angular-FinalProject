import { TestBed } from "@angular/core/testing"
import { AuthComponent } from "./auth.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { FormsModule } from "@angular/forms"

describe('AuthComponent', () => {
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule, FormsModule]
        })
    });
    
    
    it('form should be invalid if form field are empty', () => {
        let component: AuthComponent;

        component = TestBed.createComponent(AuthComponent).componentInstance;

        component.email.setValue('');

        component.password.setValue('');

        expect(component.loginForm.invalid).toBeTrue();
    });

})