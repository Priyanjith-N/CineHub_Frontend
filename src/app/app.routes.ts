import { Routes } from '@angular/router';
import { AuthBGComponent } from './features/auth/user/auth-bg/auth-bg.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegisterFormComponent } from './shared/components/register-form/register-form.component';
import { OtpEmailVerificationFormComponent } from './shared/components/otp-email-verification-form/otp-email-verification-form.component';
import { HomePageComponent } from './features/home/user/home-page/home-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthBGComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'login',
                canActivate: [authGuard],
                component: LoginFormComponent
            },
            {
                path: 'register',
                canActivate: [authGuard],
                component: RegisterFormComponent
            },
            {
                path: 'verifyEmail',
                canActivate: [authGuard],
                component: OtpEmailVerificationFormComponent
            },
        ]
    },
    {
        path: '',
        component: HomePageComponent
    }
];
