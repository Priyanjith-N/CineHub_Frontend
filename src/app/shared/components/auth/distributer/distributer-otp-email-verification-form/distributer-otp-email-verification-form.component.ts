import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../../../core/services/toast-message.service';
import { CookieService } from 'ngx-cookie-service';
import IToastOption from '../../../../models/IToastOption.interface';
import { IOTPResendSuccessfullResponse, IOTPVerificationErrorResponse, IOTPVerificationSuccessfullResponse } from '../../../../models/IOTPVerificationResponse.interface';
import { Observable } from 'rxjs';
import { DistributerAuthService } from '../../../../../core/services/distributer-auth.service';
import { DocumentVerificationPendingMessagePageService } from '../../../../../core/services/document-verification-pending-message-page.service';

@Component({
  selector: 'app-distributer-otp-email-verification-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './distributer-otp-email-verification-form.component.html',
  styleUrl: './distributer-otp-email-verification-form.component.css'
})
export class DistributerOtpEmailVerificationFormComponent {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  email: string;
  resendOTPRequest: boolean = false;
  otpVerificationForm: FormGroup;
  isFormSubmited: boolean = false;
  showResendOTPOption: boolean = false;
  private otpTimer!: ReturnType<typeof setInterval>;
  minutes: string = '0';
  seconds: string = '0';

  constructor(private router: Router, private renderer: Renderer2, private toastMessageService: ToastMessageService, private cookieService: CookieService, private distributerAuthService: DistributerAuthService, private documentVerificationPendingMessagePageService: DocumentVerificationPendingMessagePageService) {
    this.email = cookieService.get('distributerEmailToBeVerified') || "example@gmail.com";
    
    this.otpVerificationForm = new FormGroup({
      firstDigit: new FormControl('', [Validators.required]),
      secondDigit: new FormControl('', [Validators.required]),
      thirdDigit: new FormControl('', [Validators.required]),
      fourthDigit: new FormControl('', [Validators.required]),
      fivethDigit: new FormControl('', [Validators.required]),
      sixthDigit: new FormControl('', [Validators.required]),
    });

    this.startTimer(); // start otp timer
  }

  ngAfterViewInit(): void {
    this.otpInputs.toArray()[0].nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.resetTimer();
  }

  private startTimer(): void {
    this.minutes = localStorage.getItem('distributerMinutes') || '01';
    this.seconds = localStorage.getItem('distributerSeconds') || '30';

    const alreadyRunedInSeconds: number = 90 - ((Number(this.minutes) * 60) + Number(this.seconds)); // how many seconds timer run
    
    
    if(alreadyRunedInSeconds < 30) {
      const enableTime: number = (30 - alreadyRunedInSeconds) * 1000;
      this.initiateResendOptionShowTime(enableTime); // resend option will enable in 30 seconds.
    }else{
      this.showResendOTPOption = true;
    }

    this.otpTimer = setInterval(() => {
      const minutes: number = Number(this.minutes);
      const seconds: number = Number(this.seconds);

      if(seconds === 0 && minutes !== 0) {
        this.seconds = '60';
        this.minutes = this.getTimeInStarndardFormat((minutes - 1)); // get time if less than 10 get 1 if greater than 9 get normal 10.
      }else if(seconds === 0 && minutes === 0) {
        this.resetTimer(); // clear the minutes and seconds store in the localstorage + clear the interval.
        return;
      }else {
        this.seconds = this.getTimeInStarndardFormat((seconds - 1));  // get time if less than 10 get 1 if greater than 9 get normal 10.
      }

      localStorage.setItem('distributerMinutes', this.minutes); // store minutes and time in localstorage so we get the track of time even page gets reloaded mannuly.
      localStorage.setItem('distributerSeconds', this.seconds);
    }, 1000);
  }

  private getTimeInStarndardFormat(time: number): string {
    if(time < 10){
      return `0${time}`;
    }else{
      return `${time}`;
    }
  }

  private resetTimer(): void {
    localStorage.removeItem('distributerMinutes');
    localStorage.removeItem('distributerSeconds');
    clearInterval(this.otpTimer);
  }

  private initiateResendOptionShowTime(enableTime: number): void {
    setTimeout(() => {
      this.showResendOTPOption = true;
    }, enableTime);
  }

  show(event: KeyboardEvent, index: number, fromCOntrolName: string): void {
    const keyChar: string = event.key;

    if (!/[0-9]|\Backspace/.test(keyChar)) {
      this.otpVerificationForm.get(fromCOntrolName)?.setValue(''); // set current value empty.
    }else if(keyChar === 'Backspace') {
      this.otpVerificationForm.get(fromCOntrolName)?.setValue(''); // set current value empty.

      if(index > 0) { // for changing the focucs to previous input box.
        this.otpInputs.toArray()[(index - 1)].nativeElement.focus();
      }
    }else{
      this.otpVerificationForm.get(fromCOntrolName)?.setValue(keyChar); // set the value to input char automatically the value would assign to formControl but for safety.
      
      if(index < 5) {
        this.otpInputs.toArray()[(index + 1)].nativeElement.focus();
      }else{
        this.onSubmit();
        this.otpInputs.toArray()[5].nativeElement.blur();
      }
    }
  }

  resendOTP(): void {
    if(this.resendOTPRequest){
      return;
    }

    this.resendOTPRequest = true;

    const otpResendAPIResponse$: Observable<IOTPResendSuccessfullResponse> = this.distributerAuthService.handelOTPRsendRequest();

    otpResendAPIResponse$.subscribe(
      ((res: IOTPResendSuccessfullResponse) => {
        this.resendOTPRequest = false;
        this.showResendOTPOption = false;
        this.resetTimer();
        this.startTimer();
        const toastOption: IToastOption = {
          severity: 'success',
          summary: 'Success',
          detail: res.message!
        }

        this.showToast(toastOption); // emit the toast option to show toast.
      }),
      ((err: any) => {
        console.log(err);
        
        this.resendOTPRequest = false;
        this.showResendOTPOption = false;
        this.resetTimer(); // to resetTimer clear localstrorage stored time.

        if(err?.errorField && err.errorField === 'email'){
          const errObj: IOTPVerificationErrorResponse = err as IOTPVerificationErrorResponse;
          const toastOption: IToastOption = {
            severity: 'error',
            summary: 'Error',
            detail: errObj.message!
          }

          this.showToast(toastOption); // emit the toast option to show toast.
          
          this.router.navigate(['/distributer/auth/login']); // no email provided so back to login page.
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
      })
    );
  }

  async onSubmit(): Promise<void> {
    if(this.otpVerificationForm.invalid || this.isFormSubmited || this.resendOTPRequest) {
      this.otpVerificationForm.setErrors({message: 'Enter Valid OTP.'});
      return this.otpVerificationForm.markAllAsTouched();
    }

    this.isFormSubmited = true;
    
    const otp: string = Object.values(this.otpVerificationForm.value).reduce((otp: string, digit) => {
      return otp += (digit as string);
    }, '');

    const otpVerificationAPIResponse$: Observable<IOTPVerificationSuccessfullResponse> = this.distributerAuthService.handelOTPVerificationRequest(otp);

    otpVerificationAPIResponse$.subscribe(
      ((res: IOTPVerificationSuccessfullResponse) => {
        this.isFormSubmited = false;
        this.showResendOTPOption = false;
        this.resetTimer();
        console.log(res);
        this.documentVerificationPendingMessagePageService.setValue(true);
        this.router.navigate(['/distributer/auth/accountNotVerified']); // navigate to welcome message page after verification.
      }),
      ((err: any) => {
        this.isFormSubmited = false;
        
        if(err?.errorField){
          const errObj: IOTPVerificationErrorResponse = err as IOTPVerificationErrorResponse;

          if(errObj.errorField === 'otp'){
            this.otpVerificationForm.setErrors({ message: errObj.message });
            this.otpVerificationForm.markAllAsTouched();
            this.otpInputs.toArray()[5].nativeElement.focus();
          }else{
            const toastOption: IToastOption = {
              severity: 'error',
              summary: 'Error',
              detail: errObj.message!
            }

            this.showToast(toastOption); // emit the toast option to show toast.
            
            this.router.navigate(['/distributer/auth/login']); // no email provided so back to login page.
          }
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
