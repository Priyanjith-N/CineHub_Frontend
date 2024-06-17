import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../core/services/user-auth.service';
import { ILoginErrorResponse, ILoginSuccessfullResponse } from '../../models/ILoginResponse.interface';
import { Observable } from 'rxjs';
import { ILoginCredentials } from '../../models/ILoginCredentials.interface';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    RouterLink, 
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  isFormSubmited: boolean = false;
  toggleShowHidePassword: boolean = false; // defaultly hides the password
  loginForm: FormGroup;
  
  constructor(private userAuthService: UserAuthService, private router: Router, private messageService: MessageService) {
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

    const loginAPIResponse$: Observable<ILoginSuccessfullResponse> = this.userAuthService.handelLoginRequest(loginCredentials);

    loginAPIResponse$.subscribe(
      (res: ILoginSuccessfullResponse) => {
        this.isFormSubmited = false;
        // navigate to home Page
        this.router.navigate(['/']);
      },
      (err: any) => {
        this.isFormSubmited = false;
        if(err?.errorField){
          const errObj: ILoginErrorResponse = err as ILoginErrorResponse;
          this.loginForm.get(errObj.errorField!)?.setErrors({ message: errObj.message});
          return;
        }else if(err?.error){
          // toast message
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error.' });
        }else{
          // error connecting toast message
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong.' });
        }
      }
    );
  }
}