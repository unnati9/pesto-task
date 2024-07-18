import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  isAuthenticated: boolean = false;
  userSubscription?: Subscription;

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user.token;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
