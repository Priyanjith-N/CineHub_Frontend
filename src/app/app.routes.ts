import { Routes } from '@angular/router';
import { AuthBGComponent } from './features/auth/user/auth-bg/auth-bg.component';
import { LoginFormComponent } from './shared/components/auth/user/login-form/login-form.component';
import { RegisterFormComponent } from './shared/components/auth/user/register-form/register-form.component';
import { OtpEmailVerificationFormComponent } from './shared/components/auth/user/otp-email-verification-form/otp-email-verification-form.component';
import { HomePageComponent } from './features/home/user/home-page/home-page.component';
import { userAuthRouteGuard } from './core/guards/auth.guard';
import { userAuthGuard } from './core/guards/user-auth.guard';
import { canAcessOTPVerifyGuard } from './core/guards/can-acess-otpverify.guard';
import { AdminAuthBGComponent } from './features/auth/admin/admin-auth-bg/admin-auth-bg.component';
import { AdminLoginFormComponent } from './shared/components/auth/admin/admin-login-form/admin-login-form.component';
import { AdminHomePageComponent } from './features/home/admin/admin-home-page/admin-home-page.component';

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
        canActivate: [], // for sample useage temp userAuthGuard
        component: HomePageComponent
    },
    {
        path: 'admin/auth',
        component: AdminAuthBGComponent,
        children: [
            {
                path: 'login',
                component: AdminLoginFormComponent
            }
        ]
    },
    {
        path: 'admin',
        component: AdminHomePageComponent,
    }
];
