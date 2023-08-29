import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from '../auth/model/auth.login.model';
import { AuthService } from '../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService, private store: Store) {
    this.authService$ = this.store.select(selectAuthUser);
  };

  public authUser = this.authService.userForAuthentication;

  logout(): void {
    this.authService.logout();
  }

  @Input()
  public authService$: Observable<LoginPayload | null>;
  
};
