import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from '../auth.service';
import { UIService } from '../../shared/ui/ui.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../tasks/new-task/new-task.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private uiService = inject(UIService);
  private router = inject(Router);
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObservable: Observable<AuthResponseData>;
    authObservable = this.authService.login(
      form.value.email,
      form.value.password
    );

    authObservable.subscribe(
      (respData) => {
        console.log(respData);
        this.router.navigate(['/']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.uiService.showSnackbar(errorMessage, '', 3000);
      }
    );
    form.reset();
  }
}
