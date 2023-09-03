import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from './model/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = ['edit', 'id', 'username', 'role', 'email'];

  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<User>();
  
  @Output()
  editUser = new EventEmitter<User>();
}
