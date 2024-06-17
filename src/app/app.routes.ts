import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/user/login-page/login-page.component';
import { HomePageComponent } from './features/home/user/home-page/home-page.component';
import { OtpEmailVerificationPageComponent } from './features/auth/user/otp-email-verification-page/otp-email-verification-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: 'verifyEmail',
        component: OtpEmailVerificationPageComponent
    },
    {
        path: '',
        component: HomePageComponent
    }
];
