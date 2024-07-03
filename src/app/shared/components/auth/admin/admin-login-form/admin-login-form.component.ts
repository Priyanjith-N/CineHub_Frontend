import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { ILoginCredentials } from '../../../../models/ILoginCredentials.interface';
import { AdminAuthService } from '../../../../../core/services/admin-auth.service';
import IToastOption from '../../../../models/IToastOption.interface';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../../../models/ILoginResponse.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-login-form.component.html',
  styleUrl: './admin-login-form.component.css'
})
export class AdminLoginFormComponent {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false; // defaultly hides the password
  loginForm: FormGroup;
  
  constructor(private adminAuthService: AdminAuthService, private router: Router, private toastMessageService: ToastMessageService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),
      password: new FormControl('', [Validators.required])
    });
  }

  toggleShowHide(): void {
    this.toggleShowHidePassword = !this.toggleShowHidePassword;
  }

  private trimAllWhiteSpaces(): void {
    Object.keys(this.loginForm.value).forEach((control) => {
      if(control) {
        const trimedValue: string = this.loginForm.get(control)?.value?.trim();
        this.loginForm.controls[control].setValue(trimedValue);
      }
    });
  }

  async onSubmit(): Promise<void> {
    this.trimAllWhiteSpaces();

    if(this.loginForm.invalid || this.isFormSubmited) {
      return this.loginForm.markAllAsTouched();
    }

    this.isFormSubmited = true; // make it true when form is submite with valid and make it flase when get a response

    const loginCredentials: ILoginCredentials = this.loginForm.value;

    const loginAPIResponse$: Observable<ILoginSuccessfullResponse> = this.adminAuthService.handelLoginRequest(loginCredentials);

    loginAPIResponse$.subscribe(
      (res: ILoginSuccessfullResponse) => {
        console.log(res);
        this.isFormSubmited = false;
        
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.router.navigate(['/']); // navigate to home Page after successfull login.
      },
      (err: any) => {
        this.isFormSubmited = false;
        if(err?.errorField){
          const errObj: ILoginErrorResponse = err as ILoginErrorResponse;
          this.loginForm.get(errObj.errorField!)?.setErrors({ message: errObj.message});
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
