import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-email-verification-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './otp-email-verification-form.component.html',
  styleUrl: './otp-email-verification-form.component.css'
})
export class OtpEmailVerificationFormComponent implements AfterViewInit, OnDestroy  {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  otpVerificationForm: FormGroup;
  isFormSubmited: boolean = false;
  showResendOTPOption: boolean = false;
  private otpTimer!: ReturnType<typeof setInterval>;
  minutes: string = '0';
  seconds: string = '0';

  constructor(private renderer: Renderer2) {
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
    this.minutes = localStorage.getItem('minutes') || '01';
    this.seconds = localStorage.getItem('seconds') || '30';

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

      localStorage.setItem('minutes', this.minutes); // store minutes and time in localstorage so we get the track of time even page gets reloaded mannuly.
      localStorage.setItem('seconds', this.seconds);
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
    localStorage.removeItem('minutes');
    localStorage.removeItem('seconds');
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
    this.showResendOTPOption = false;
    // resend otp logic
    this.resetTimer();
    this.startTimer();
  }

  async onSubmit(): Promise<void> {
    if(this.otpVerificationForm.invalid) {
      this.otpVerificationForm.setErrors({message: 'Enter Valid OTP.'});
      return this.otpVerificationForm.markAllAsTouched();
    }

    this.isFormSubmited = true;
    
  }
}