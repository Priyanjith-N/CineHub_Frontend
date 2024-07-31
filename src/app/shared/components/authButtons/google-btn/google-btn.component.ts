import { GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-btn',
  standalone: true,
  imports: [
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  templateUrl: './google-btn.component.html',
  styleUrl: './google-btn.component.css'
})
export class GoogleBtnComponent {
  @Input({required: true}) text: "signin_with" | "signup_with" | "continue_with" = "continue_with";
}
