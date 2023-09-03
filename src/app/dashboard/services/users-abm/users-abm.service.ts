import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../users/model/users.model';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import db from '../../../../../db.json';

@Injectable({
  providedIn: 'root'
})
export class UsersAbmService {

  constructor(private httpClient: HttpClient) { }

  private _users$ = new BehaviorSubject<User[]>([]);

  private users$ = this._users$.asObservable();

  loadUsers(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next: response => {
        this._users$.next(response);
      },
      error: () => alert("Loading users ERROR!")
    });
  };

  getUsers(): Observable<User[]> {
    return this.users$;
  };

  addUser(newUser: User): void {
    const isUser = db.users.find( u => u.email === newUser.email );

    if (!isUser) {
      this.httpClient.post<User>('http://localhost:3000/users', newUser)
        .pipe(
          mergeMap(userToBeAdded => this.users$.pipe(
            take(1),
            map(oldCollection => [...oldCollection, userToBeAdded])
          ))
        )
        .subscribe({
          next: updatedCollection => {
            this._users$.next(updatedCollection)
          }
        });

      alert(`User created succesfully.`);

    } else {
      alert(`That email is already at use. Try another one.`);

    };
  };

  deleteUser(userToDelete: User): void {
    const confirmAction: boolean = confirm(
      `Are you sure you want to delete user ${userToDelete.username?.toUpperCase()}?`);

    if (confirmAction) {
      this.httpClient.delete(`http://localhost:3000/users/${userToDelete.id}`)
        .pipe(
          mergeMap(
            () => this.users$.pipe(
              take(1),
              map(newCollection => newCollection.filter(
                user => user.id !== userToDelete.id
              ))
            )
          )
        )
        .subscribe({
          next: newCollection => this._users$.next(newCollection)
        });
    };
  };

  editUser(userToEdit: User): void {
    this.users$.pipe(take(1)).subscribe({
      next: (oldCollection) => {
        const editAction = prompt(
          `--------------\nEditing ${userToEdit.username?.toUpperCase()}\nChoose one to update:\n(1) Username\n(2) Email\n(3) Password\n(4) Role\n(5) Press any key to cancel.`
        );
        switch (editAction) {
          case '1':
            const editName: string | null = prompt(`--------------\nEditing ${userToEdit.username?.toUpperCase()}\nNew username: `);

            if (editName) {
              userToEdit.username = editName;

              this.httpClient.put<User[]>(`http://localhost:3000/users/${userToEdit.id}`, userToEdit)
                .subscribe({
                  next: () => this.loadUsers()
                })
            }
            
            break;

          case '2':
            const editEmail: string | null = prompt(`--------------\nEditing ${userToEdit.username?.toUpperCase()}\nNew user email: `);

            const isEmail: User | undefined = db.users.find( u => u.email === editEmail );

            console.log(isEmail);

            if (editEmail && !isEmail) {
              userToEdit.email = editEmail;

              this.httpClient.put<User[]>(`http://localhost:3000/users/${userToEdit.id}`, userToEdit)
                .subscribe({
                  next: () => this.loadUsers()
                })
            } else {
              alert("That email is already at use or you cancelled email changing.");
            }
            
            break;

          case '3':
            const editPassword: string | null = prompt(`--------------\nEditing ${userToEdit.username?.toUpperCase()}\nNew user password: `);

            if (editPassword) {
              userToEdit.password = editPassword;

              this.httpClient.put<User[]>(`http://localhost:3000/users/${userToEdit.id}`, userToEdit)
                .subscribe({
                  next: () => this.loadUsers()
                })
            }
            
            break;

            case '4':
              const editRole: string | null = prompt(`--------------\nEditing ${userToEdit.username?.toUpperCase()}\nNew user role: `);

              if (editRole) {
                userToEdit.role = editRole.toUpperCase();

                this.httpClient.put<User[]>(`http://localhost:3000/users/${userToEdit.id}`, userToEdit)
                  .subscribe({
                    next: () => this.loadUsers()
                  })
              }
            
            break;


            default:
              return this.users$;
        };

        return this.users$;
      }
    });
  }

};
