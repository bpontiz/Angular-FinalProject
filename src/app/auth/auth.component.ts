import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  username = new FormControl('');

  public loginForm = new FormGroup({
    username: this.username,
    email: this.email,
    password: this.password
  });

  getErrorMessage(control: FormControl<string | null>) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  };

  login(): void {
    if (!this.loginForm.invalid) {
      this.authService.login(this.loginForm.getRawValue())
    };
  };
}