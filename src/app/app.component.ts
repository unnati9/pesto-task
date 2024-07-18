import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { DUMMY_USERS } from './dummy-users';
import { User } from './users/user/user.model';
import { UserComponent } from './users/user/user.component';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    UserComponent,
    TasksComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pesto-task';

  private authService = inject(AuthService);
  private userSubscription?: Subscription;

  public users: Array<User> = DUMMY_USERS;
  public isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user.token;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
