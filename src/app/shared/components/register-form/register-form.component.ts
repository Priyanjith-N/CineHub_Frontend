import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  toggleShowHidePassword: boolean = false;
  toggleShowHideConfirmPassword: boolean = false;

  toggleShowHide(password: boolean = true): void {
    if(password) {
      this.toggleShowHidePassword = !this.toggleShowHidePassword;
    }else{
      this.toggleShowHideConfirmPassword = !this.toggleShowHideConfirmPassword;
    }
  }
}
