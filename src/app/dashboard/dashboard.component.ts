import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload } from '../auth/model/auth.login.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private authService: AuthService) {
    this.authService$ = this.authService.authService$;
  };

  @Input()
  public authService$: Observable<LoginPayload | null>;
  
};
