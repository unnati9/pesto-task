import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { DUMMY_USERS } from './dummy-users';
import { UsersComponent } from './users/users.component';
import { User } from './users/user/user.model';
import { UserComponent } from './users/user/user.component';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

// This decorator converts the AppComponent class to a component
// This @Component decorators takes an object which is the metadata for the component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    UserComponent,
    TasksComponent,
    UsersComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'easy-task';

  public users: Array<User> = DUMMY_USERS;
  public selectedUser?: User;
  public isNewTaskPopup: boolean = false;
  private authService = inject(AuthService);
  isAuthenticated: boolean = false;
  userSubscription?: Subscription;

  onUserClick(id: string) {
    this.selectedUser = this.users.find((user) => user.id === id);
  }

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
