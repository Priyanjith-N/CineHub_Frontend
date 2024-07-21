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
import { TheaterOwerAuthBgComponent } from './features/auth/theaterOwner/theater-owner-auth-bg/theater-owner-auth-bg.component';
import { TheaterOwerLoginFormComponent } from './shared/components/auth/theaterOwner/theater-owner-login-form/theater-owner-login-form.component';
import { TheaterOwnerOtpEmailVerifcationFormComponent } from './shared/components/auth/theaterOwner/theater-owner-otp-email-verifcation-form/theater-owner-otp-email-verifcation-form.component';
import { TheaterOwnerRegisterFormComponent } from './shared/components/auth/theaterOwner/theater-owner-register-form/theater-owner-register-form.component';
import { DistributerAuthBgComponent } from './features/auth/distributer/distributer-auth-bg/distributer-auth-bg.component';
import { DistributerLoginFormComponent } from './shared/components/auth/distributer/distributer-login-form/distributer-login-form.component';
import { TheaterOwnerAccountNotVerifiedMessageComponent } from './shared/components/auth/theaterOwner/theater-owner-account-not-verified-message/theater-owner-account-not-verified-message.component';
import { DistributerAccountNotVerifiedMessageComponent } from './shared/components/auth/distributer/distributer-account-not-verified-message/distributer-account-not-verified-message.component';
import { DistributerRegisterFormComponent } from './shared/components/auth/distributer/distributer-register-form/distributer-register-form.component';
import { canAcessDocumentVerificationPendingPageGuard } from './core/guards/can-acess-document-verification-pending-page.guard';

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
        path: 'theaterOwner/auth',
        component: TheaterOwerAuthBgComponent,
        children: [
            {
                path: 'login',
                component: TheaterOwerLoginFormComponent
            },
            {
                path: 'register',
                component: TheaterOwnerRegisterFormComponent
            },
            {
                path: 'verifyEmail',
                component: TheaterOwnerOtpEmailVerifcationFormComponent
            },
            {
                path: 'accountNotVerified',
                component: TheaterOwnerAccountNotVerifiedMessageComponent
            }
        ]
    },
    {
        path: 'distributer/auth',
        component: DistributerAuthBgComponent,
        children: [
            {
                path: 'login',
                component: DistributerLoginFormComponent
            },
            {
                path: 'register',
                component: DistributerRegisterFormComponent
            },
            {
                path: 'verifyEmail',
                component: TheaterOwnerOtpEmailVerifcationFormComponent
            },
            {
                path: 'accountNotVerified',
                canActivate: [canAcessDocumentVerificationPendingPageGuard],
                component: DistributerAccountNotVerifiedMessageComponent
            }
        ]
    },
    {
        path: '',
        canActivate: [], // for sample useage temp userAuthGuard
        component: HomePageComponent
    },
    {
        path: 'admin',
        component: AdminHomePageComponent,
    }
];
