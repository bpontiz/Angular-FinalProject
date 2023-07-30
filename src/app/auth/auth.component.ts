import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  getErrorMessage(control: FormControl<string | null>) {
    if (control.hasError('required')) {
      return 'You must enter an email';
    }

    if (control.hasError('required')) {
      return 'You must enter a password';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }
}