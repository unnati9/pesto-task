import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from '../auth.service';
import { UIService } from '../../shared/ui/ui.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../tasks/new-task/new-task.component.css'],
})
export class SignupComponent {
  private authService = inject(AuthService);
  private uiService = inject(UIService);
  private router = inject(Router);
  
  public selectedImage = '';

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.selectedImage = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObservable: Observable<AuthResponseData>;
    authObservable = this.authService.signUp(
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
