import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user.model';
import { TasksService } from '../tasks/tasks.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(new User('', '', '', new Date()));

  constructor(
    private http: HttpClient,
    private router: Router,
    private tasksService: TasksService
  ) {}

  signUp(
    email: string,
    password: string,
  ) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYs3AqfjzqS8eFdttSEvSnHkYtcdOXrtQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYs3AqfjzqS8eFdttSEvSnHkYtcdOXrtQ',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((respData) => {
          console.log('resp Data:', respData);
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userString = localStorage.getItem('userData');
    if (userString) {
      const userData = JSON.parse(userString);
      const user = new User(
        userData.email,
        userData.userId,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (user.token) {
        this.user.next(user);
        const expiresIn =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expiresIn);
      }
    }
  }

  logout() {
    this.user.next(new User('', '', '', new Date()));
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  autoLogout(expirationDuration: number) {
    this.tasksService.fetchTasks().subscribe();
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    console.log(email);
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    console.log('user', user);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);

    let errorMessage: string = 'Unknown error occured!';
    switch (errorRes.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage =
          'Invalid credentials. Please check your email or password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email is not registered.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists. Please login instead.';
    }
    return throwError(() => new Error(errorMessage));
  }
}
