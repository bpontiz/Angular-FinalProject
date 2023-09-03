import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersAbmService } from '../services/users-abm/users-abm.service';
import { Store } from '@ngrx/store';
import { User } from '../users/model/users.model';
import { Observable } from 'rxjs';



interface UserModel {
  id: FormControl <string | null>;
  username: FormControl <string | null>;
  email: FormControl <string | null>;
  password: FormControl <string | null>;
  token: FormControl <string | null>;
  role: FormControl <string | null>;
};

interface RoleType {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-users-abm',
  templateUrl: './users-abm.component.html',
  styleUrls: ['./users-abm.component.scss']
})
export class UsersAbmComponent {
  constructor(
    private fb: FormBuilder,
    private userService: UsersAbmService,
    private store: Store
  ) {
    this.userService.loadUsers();

    this.users = this.userService.getUsers();
  }

  public users: Observable<User[]>;

  id_control = new FormControl('', [Validators.required]);

  username_control = new FormControl('', [Validators.required]);

  email_control = new FormControl('', [Validators.required]);

  password_control = new FormControl('', [Validators.required]);

  token_control = new FormControl('', [Validators.required]);

  role_control = new FormControl('', [Validators.required]);

  userModel: FormGroup <UserModel> = new FormGroup(
    {
      id: this.id_control,
      username: this.username_control,
      email: this.email_control,
      password: this.password_control,
      token: this.token_control,
      role: this.role_control
    }
  );

  types: RoleType[] = [
    {value: 'ADMINISTRATOR', viewValue: 'ADMINISTRATOR'},
    {value: 'USER', viewValue: 'USER'},
  ];

  getErrorMessage(control: FormControl <string | null>) {
    return control.hasError('required') ? 'You must enter a value.' : '';
  };

  onSubmit(): void {
    this.userService.addUser(
      {
        id: 0,
        username: this.username_control.value,
        email: this.email_control.value,
        password: this.password_control.value,
        token: '',
        role: this.role_control.value
      }
    );
  };

  onDeleteUser(deleteUser: User): void {
    this.userService.deleteUser(deleteUser);
  };

  onEditUser(editUser: User): void {    
    this.userService.editUser(editUser);
  };

};