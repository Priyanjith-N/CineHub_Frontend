import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IUserRegisterCredentials } from '../../../../models/IRegisterCredentials.interface';
import { Observable } from 'rxjs';
import { IRegisterErrorResponse, IRegisterSuccessfullResponse } from '../../../../models/IRegisterResponse.interface';
import { UserAuthService } from '../../../../../core/services/user-auth.service';

import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import IToastOption from '../../../../models/IToastOption.interface';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false;
  toggleShowHideConfirmPassword: boolean = false;
  registerFrom: FormGroup;

  constructor(private userAuthService: UserAuthService, private toastMessageService: ToastMessageService, private router: Router) {
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

    const userRegisterCredentials: IUserRegisterCredentials = this.registerFrom.value;

    const registerAPIResponse$: Observable<IRegisterSuccessfullResponse> = this.userAuthService.handelRegisterationRequest(userRegisterCredentials);

    registerAPIResponse$.subscribe(
      (res: IRegisterSuccessfullResponse) => {
        this.isFormSubmited = false;
        // if needed show toast message
        this.router.navigate(['/auth/verifyEmail']); // navigate to otp verification page.
      },
      (err: any) => {
        this.isFormSubmited = false;
        if(err?.errorField){
          const errObj: IRegisterErrorResponse = err as IRegisterErrorResponse;
          this.registerFrom.get(errObj.errorField!)?.setErrors({ message: errObj.message});
        }else if(err?.error){
          // toast message
          const toastOption: IToastOption = {
            severity: 'error',
            summary: 'Error',
            detail: 'Internal Server Error.'
          }
  
          this.showToast(toastOption); // emit the toast option to show toast.
        }else{
          // error connecting toast message
          const toastOption: IToastOption = {
            severity: 'error',
            summary: 'Error',
            detail: 'Something Went Wrong.'
          }
  
          this.showToast(toastOption); // emit the toast option to show toast.
        }
      }
    );
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
