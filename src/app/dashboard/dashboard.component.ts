import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from '../auth/model/auth.login.model';
import { AuthService } from '../auth/services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser, selectAuthUserRole } from '../store/auth/auth.selector';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService, private store: Store) {
    this.authService$ = this.store.select(selectAuthUser);

    this.role$ = this.store.select(selectAuthUserRole);
  };

  
  public authUser = this.authService.userForAuthentication;
  
  public role$: Observable<string | null | undefined>;
  
  logout(): void {
    this.authService.logout();
  }
  
  @Input()
  public drawer?: MatDrawer;
  public authService$: Observable<LoginPayload | null>;
  
};
