import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OtpEmailVerificationFormComponent } from '../../../../shared/components/otp-email-verification-form/otp-email-verification-form.component';

@Component({
  selector: 'app-otp-email-verification-page',
  standalone: true,
  imports: [
    RouterLink,
    OtpEmailVerificationFormComponent
  ],
  templateUrl: './otp-email-verification-page.component.html',
  styleUrl: './otp-email-verification-page.component.css'
})
export class OtpEmailVerificationPageComponent {

}
