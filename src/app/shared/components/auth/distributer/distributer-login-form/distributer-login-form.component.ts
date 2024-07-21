import { Component } from '@angular/core';
import IToastOption from '../../../../models/IToastOption.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { DistributerAuthService } from '../../../../../core/services/distributer-auth.service';
import { Observable } from 'rxjs';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../../../models/ILoginResponse.interface';
import { ILoginCredentials } from '../../../../models/ILoginCredentials.interface';
import { DocumentVerificationPendingMessagePageService } from '../../../../../core/services/document-verification-pending-message-page.service';

@Component({
  selector: 'app-distributer-login-form',
  standalone: true,
  imports: [
    RouterLink, 
    ReactiveFormsModule,
  ],
  templateUrl: './distributer-login-form.component.html',
  styleUrl: './distributer-login-form.component.css'
})
export class DistributerLoginFormComponent {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false; // defaultly hides the password
  loginForm: FormGroup;
  
  constructor(private router: Router, private toastMessageService: ToastMessageService, private distributerAuthService: DistributerAuthService, private documentVerificationPendingMessagePageService: DocumentVerificationPendingMessagePageService) {
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

    const loginAPIResponse$: Observable<ILoginSuccessfullResponse> = this.distributerAuthService.handleLoginRequest(loginCredentials);

    loginAPIResponse$.subscribe(
      (res: ILoginSuccessfullResponse) => {
        this.isFormSubmited = false;
        
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message
        }

        this.showToast(toastOption); // emit the toast option to show toast.
        
        this.router.navigate(['/distributer']); // navigate to home Page after successfull login.
      },
      ((err: any) => {
        this.isFormSubmited = false;
        
        if(err?.errorField){
          const errObj: ILoginErrorResponse = err as ILoginErrorResponse;

          this.loginForm.get(errObj.errorField!)?.setErrors({ message: errObj.message});
        }else if(err?.notOTPVerified) {
          const errObj: ILoginErrorResponse = err as ILoginErrorResponse;

          const toastOption: IToastOption = {
            severity: 'info',
            summary: errObj.message!,
            detail: 'An OTP is send via Email. Verify account now'
          }

          this.showToast(toastOption); // emit the toast option to show toast.

          this.router.navigate(['/distributer/auth/verifyEmail']);// navigating to otp verification page for account verfication step.
        }else if(err?.notDocumentVerified) {
          this.documentVerificationPendingMessagePageService.setValue(true);

          this.router.navigate(['/distributer/auth/accountNotVerified']); // navigating to account not verified page for showing welcome message.
        }else {
          const errMessage: string = err?.requiredErrMessage || 'Something Went Wrong.';

          const toastOption: IToastOption = {
            severity: 'error',
            summary: 'Error',
            detail: errMessage
          }
  
          this.showToast(toastOption); // emit the toast option to show toast.
        }
      })
    );
  }

  private showToast(toastOption: IToastOption): void {
    this.toastMessageService.showToast(toastOption); // emit value to subject for geting value accross the appliction for toast message.
  }
}
