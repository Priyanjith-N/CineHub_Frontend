import { Component } from '@angular/core';
import IToastOption from '../../../../models/IToastOption.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-distributer-register-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './distributer-register-form.component.html',
  styleUrl: './distributer-register-form.component.css'
})
export class DistributerRegisterFormComponent {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false;
  toggleShowHideConfirmPassword: boolean = false;
  registerFrom: FormGroup;

  constructor(private toastMessageService: ToastMessageService, private router: Router) {
    this.registerFrom = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  toggleShowHide(password: boolean = true): void {
    if(password) {
      this.toggleShowHidePassword = !this.toggleShowHidePassword;
    }else{
      this.toggleShowHideConfirmPassword = !this.toggleShowHideConfirmPassword;
    }
  }

  private trimAllWhiteSpaces(): void {
    Object.keys(this.registerFrom.value).forEach((control) => {
      if(control) {
        const trimedValue: string = this.registerFrom.get(control)?.value?.trim();
        this.registerFrom.controls[control].setValue(trimedValue);
      }
    });
  }

  private bothConfirmPasswordAndPasswordCheck() {
    const { password, confirmPassword } = this.registerFrom.value;

    if(password && (password as string).length < 8) {
      this.registerFrom.get('password')?.setErrors({ message: `Password should be 8 characters long.` });

    }else if(password && confirmPassword && (password !== confirmPassword)) {
      this.registerFrom.get('confirmPassword')?.setErrors({ message: `Both Password doesn't match.` });
    }
  }

  async onSubmit(): Promise<void> {
    this.trimAllWhiteSpaces(); // remove leading and traling zero
    this.bothConfirmPasswordAndPasswordCheck(); // validate both password and confirmpassword

    if(this.registerFrom.invalid || this.isFormSubmited) {
      return this.registerFrom.markAllAsTouched();
    }

    this.isFormSubmited = true;
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
