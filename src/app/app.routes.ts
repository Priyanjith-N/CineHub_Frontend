import { Routes } from '@angular/router';
import { AuthBGComponent } from './features/auth/user/auth-bg/auth-bg.component';
import { LoginFormComponent } from './shared/components/auth/user/login-form/login-form.component';
import { RegisterFormComponent } from './shared/components/auth/user/register-form/register-form.component';
import { OtpEmailVerificationFormComponent } from './shared/components/auth/user/otp-email-verification-form/otp-email-verification-form.component';
import { HomePageComponent } from './features/home/user/home-page/home-page.component';
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
import { TheaterOwnerHomePageComponent } from './features/home/theaterOwner/theater-owner-home-page/theater-owner-home-page.component';
import { DistributerOtpEmailVerificationFormComponent } from './shared/components/auth/distributer/distributer-otp-email-verification-form/distributer-otp-email-verification-form.component';
import { DistributerHomePageComponent } from './features/home/distributer/distributer-home-page/distributer-home-page.component';
import { AdminManagementComponent } from './shared/components/home/admin/admin-management/admin-management.component';
import { AdminUserManagementComponent } from './shared/components/home/admin/admin-user-management/admin-user-management.component';
import { AdminDistributerManagementComponent } from './shared/components/home/admin/admin-distributer-management/admin-distributer-management.component';
import { AdminTheaterOwnerManagementComponent } from './shared/components/home/admin/admin-theater-owner-management/admin-theater-owner-management.component';
import { AccountVerificationManagementComponent } from './shared/components/home/admin/account-verification-management/account-verification-management.component';
import { AdminAccountVerificationDetailPageComponent } from './shared/components/home/admin/admin-account-verification-detail-page/admin-account-verification-detail-page.component';
import { theaterOwnerAuthGuard } from './core/guards/theater-owner-auth.guard';
import { canAcessUserAuthRoutesGuard } from './core/guards/can-acess-user-auth-routes.guard';
import { canAcessTheaterOwnerAuthRoutesGuard } from './core/guards/can-acess-theater-owner-auth-routes.guard';
import { canAcessDistributerAuthRoutesGuard } from './core/guards/can-acess-distributer-auth-routes.guard';
import { distributerAuthGuard } from './core/guards/distributer-auth.guard';
import { canAcessAdminAuthRoutesGuard } from './core/guards/can-acess-admin-auth-routes.guard';
import { adminAuthGuard } from './core/guards/admin-auth.guard';
import { AdminMovieManagementComponent } from './shared/components/home/admin/admin-movie-management/admin-movie-management.component';
import { AddMovieFormComponent } from './shared/components/home/admin/add-movie-form/add-movie-form.component';
import { DistributeMoviesComponent } from './shared/components/home/distributer/distribute-movies/distribute-movies.component';
import { MyMoviesComponent } from './shared/components/home/distributer/my-movies/my-movies.component';
import { ManageTheaterComponent } from './shared/components/home/theaterOwner/manage-theater/manage-theater.component';
import { AddTheaterComponent } from './shared/components/home/theaterOwner/add-theater/add-theater.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthBGComponent,
        canActivate: [canAcessUserAuthRoutesGuard],
        children: [
            {
                path: 'login',
                canActivate: [canAcessUserAuthRoutesGuard],
                component: LoginFormComponent
            },
            {
                path: 'register',
                canActivate: [canAcessUserAuthRoutesGuard],
                component: RegisterFormComponent
            },
            {
                path: 'verifyEmail',
                canActivate: [canAcessUserAuthRoutesGuard, canAcessOTPVerifyGuard],
                component: OtpEmailVerificationFormComponent
            },
        ]
    },
    {
        path: 'admin/auth',
        canActivate: [canAcessAdminAuthRoutesGuard],
        component: AdminAuthBGComponent,
        children: [
            {
                path: 'login',
                canActivate: [canAcessAdminAuthRoutesGuard],
                component: AdminLoginFormComponent
            }
        ]
    },
    {
        path: 'theaterOwner/auth',
        component: TheaterOwerAuthBgComponent,
        canActivate: [canAcessTheaterOwnerAuthRoutesGuard],
        children: [
            {
                path: 'login',
                canActivate: [canAcessTheaterOwnerAuthRoutesGuard],
                component: TheaterOwerLoginFormComponent
            },
            {
                path: 'register',
                canActivate: [canAcessTheaterOwnerAuthRoutesGuard],
                component: TheaterOwnerRegisterFormComponent
            },
            {
                path: 'verifyEmail',
                canActivate: [canAcessTheaterOwnerAuthRoutesGuard],
                component: TheaterOwnerOtpEmailVerifcationFormComponent
            },
            {
                path: 'accountNotVerified',
                canActivate: [canAcessTheaterOwnerAuthRoutesGuard, canAcessDocumentVerificationPendingPageGuard],
                component: TheaterOwnerAccountNotVerifiedMessageComponent
            }
        ]
    },
    {
        path: 'distributer/auth',
        canActivate: [canAcessDistributerAuthRoutesGuard],
        component: DistributerAuthBgComponent,
        children: [
            {
                path: 'login',
                canActivate: [canAcessDistributerAuthRoutesGuard],
                component: DistributerLoginFormComponent
            },
            {
                path: 'register',
                canActivate: [canAcessDistributerAuthRoutesGuard],
                component: DistributerRegisterFormComponent
            },
            {
                path: 'verifyEmail',
                canActivate: [canAcessDistributerAuthRoutesGuard],
                component: DistributerOtpEmailVerificationFormComponent
            },
            {
                path: 'accountNotVerified',
                canActivate: [canAcessDistributerAuthRoutesGuard, canAcessDocumentVerificationPendingPageGuard],
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
        canActivate: [adminAuthGuard],
        component: AdminHomePageComponent,
        children: [
            {
                path: 'verifyRequest',
                canActivate: [adminAuthGuard],
                component: AccountVerificationManagementComponent
            },
            {
                path: 'verifyRequest/:role/:id',
                canActivate: [adminAuthGuard],
                component: AdminAccountVerificationDetailPageComponent
            },
            {
                path: 'administration',
                canActivate: [adminAuthGuard],
                component: AdminManagementComponent,
                children: [
                    {
                        path: 'userManagement',
                        canActivate: [adminAuthGuard],
                        component: AdminUserManagementComponent
                    },
                    {
                        path: 'theaterOwnerManagement',
                        canActivate: [adminAuthGuard],
                        component: AdminTheaterOwnerManagementComponent
                    },
                    {
                        path: 'distributerManagement',
                        canActivate: [adminAuthGuard],
                        component: AdminDistributerManagementComponent
                    }
                ]
            },
            {
                path: 'moviemanagement',
                canActivate: [adminAuthGuard],
                component: AdminMovieManagementComponent
            },
            {
                path: 'moviemanagement/addmovie',
                component: AddMovieFormComponent
            }
        ]
    },
    {
        path: 'distributer',
        canActivate: [distributerAuthGuard],
        component: DistributerHomePageComponent,
        children: [
            {
                path: 'distributemovies',
                canActivate: [distributerAuthGuard],
                component: DistributeMoviesComponent
            },
            {
                path: 'mymovies',
                canActivate: [distributerAuthGuard],
                component: MyMoviesComponent
            }
        ]
    },
    {
        path: 'theaterOwner',
        canActivate: [theaterOwnerAuthGuard],
        component: TheaterOwnerHomePageComponent,
        children: [
            {
                path: 'managetheater',
                canActivate: [theaterOwnerAuthGuard],
                component: ManageTheaterComponent
            },
            {
                path: 'managetheater/addtheater',
                canActivate: [theaterOwnerAuthGuard],
                component: AddTheaterComponent
            }
        ]
    }
];
