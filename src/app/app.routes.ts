import { Routes } from '@angular/router';
import { AuthBGComponent } from './features/auth/user/auth-bg/auth-bg.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegisterFormComponent } from './shared/components/register-form/register-form.component';
import { OtpEmailVerificationFormComponent } from './shared/components/otp-email-verification-form/otp-email-verification-form.component';
import { HomePageComponent } from './features/home/user/home-page/home-page.component';
import { userAuthRouteGuard } from './core/guards/auth.guard';
import { userAuthGuard } from './core/guards/user-auth.guard';
import { canAcessOTPVerifyGuard } from './core/guards/can-acess-otpverify.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthBGComponent,
        canActivate: [userAuthRouteGuard],
        children: [
            {
                path: 'login',
                canActivate: [userAuthRouteGuard],
                component: LoginFormComponent
            },
            {
                path: 'register',
                canActivate: [userAuthRouteGuard],
                component: RegisterFormComponent
            },
            {
                path: 'verifyEmail',
                canActivate: [userAuthRouteGuard, canAcessOTPVerifyGuard],
                component: OtpEmailVerificationFormComponent
            },
        ]
    },
    {
        path: '',
        canActivate: [userAuthGuard], // for sample useage temp
        component: HomePageComponent
    }
];
