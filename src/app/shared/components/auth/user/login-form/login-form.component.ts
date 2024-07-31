import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../../../core/services/user-auth.service';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../../../models/ILoginResponse.interface';
import { Observable } from 'rxjs';
import { ILoginCredentials } from '../../../../models/ILoginCredentials.interface';

import IToastOption from '../../../../models/IToastOption.interface';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { GoogleBtnComponent } from '../../../authButtons/google-btn/google-btn.component';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    RouterLink, 
    ReactiveFormsModule,
    GoogleBtnComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false; // defaultly hides the password
  loginForm: FormGroup;
  
  constructor(private userAuthService: UserAuthService, private router: Router, private toastMessageService: ToastMessageService, private authService: SocialAuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+@gmail\.com$/)]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      if(user) {
        const idToken: string = user.idToken;
        this.googleAuthLogin(idToken);
      }
    });
  }

  private googleAuthLogin(idToken: string) {
    const loginAPIResponse$: Observable<ILoginSuccessfullResponse> = this.userAuthService.handelGoogleLogin(idToken);

    loginAPIResponse$.subscribe(
      ((res) => {
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.router.navigate(['/']); // navigate to home Page after successfull login.
      }),
      ((err: any) => {
        console.log(err);
        
        const toastOption: IToastOption = {
          severity: 'error',
          summary: 'Error',
          detail: 'Internal Server Error.'
        }

        if(err.requiredErrMessage) {
          toastOption.detail = err.requiredErrMessage;
        }

        this.showToast(toastOption);
      })
    );
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

    const loginAPIResponse$: Observable<ILoginSuccessfullResponse> = this.userAuthService.handelLoginRequest(loginCredentials);

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
          if(errObj.errorField === 'otp') {
            const toastOption: IToastOption = {
              severity: 'info',
              summary: errObj.message!,
              detail: 'An OTP is send via Email. Verify account now'
            }
            
            this.showToast(toastOption); // emit the toast option to show toast.
            
            this.router.navigate(['/auth/verifyEmail']);// navigating to otp verification page for account verfication step.
          }else{
            this.loginForm.get(errObj.errorField!)?.setErrors({ message: errObj.message});
            this.loginForm.markAllAsTouched();
          }
          return;
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