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
import { DistributeMoviesComponent } from './shared/components/home/distributer/distribute-movies/distribute-movies.component';
import { MyMoviesComponent } from './shared/components/home/distributer/my-movies/my-movies.component';
import { ManageTheaterComponent } from './shared/components/home/theaterOwner/manage-theater/manage-theater.component';
import { AddTheaterComponent } from './shared/components/home/theaterOwner/add-theater/add-theater.component';
import { DistributerListingComponent } from './shared/components/home/theaterOwner/distributer-listing/distributer-listing.component';
import { MovieLisingBasedOnDistributerComponent } from './shared/components/home/theaterOwner/movie-lising-based-on-distributer/movie-lising-based-on-distributer.component';
import { SingletheatermangeComponent } from './shared/components/home/theaterOwner/singletheatermange/singletheatermange.component';
import { ScreensComponent } from './shared/components/home/theaterOwner/screens/screens.component';
import { AddscreensComponent } from './shared/components/home/theaterOwner/addscreens/addscreens.component';
import { EditMovieComponentComponent } from './shared/components/home/admin/edit-movie-component/edit-movie-component.component';
import { AddMovieComponent } from './shared/components/home/admin/add-movie/add-movie.component';
import { MyMovieRequestsComponent } from './shared/components/home/theaterOwner/my-movie-requests/my-movie-requests.component';
import { ApproveRejectMovieRequestComponent } from './shared/components/home/distributer/approve-reject-movie-request/approve-reject-movie-request.component';
import { AddScheduleComponent } from './shared/components/home/theaterOwner/add-schedule/add-schedule.component';
import { ManageScheduleComponent } from './shared/components/home/theaterOwner/manage-schedule/manage-schedule.component';
import { MyMovieCollectionComponent } from './shared/components/home/theaterOwner/my-movie-collection/my-movie-collection.component';
import { LandingPageComponent } from './shared/components/home/user/landing-page/landing-page.component';
import { MovieDetailsComponent } from './shared/components/home/user/movie-details/movie-details.component';
import { BookmovieComponent } from './shared/components/home/user/bookmovie/bookmovie.component';
import { SelectseatComponent } from './shared/components/home/user/selectseat/selectseat.component';
import { ConfirmPaymentComponent } from './shared/components/home/user/confirm-payment/confirm-payment.component';
import { userAuthGuard } from './core/guards/user-auth.guard';

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
        component: HomePageComponent,
        children: [
            {
                path: '',
                canActivate: [],
                component: LandingPageComponent
            },
            {
                path: 'movie/:movieId',
                canActivate: [],
                component: MovieDetailsComponent
            },
            {
                path: 'bookmovie/:movieId',
                canActivate: [],
                component: BookmovieComponent
            },
            {
                path: 'bookseat/:scheduleId',
                canActivate: [],
                component: SelectseatComponent
            },
            {
                path: 'bookseat/:scheduleId/confirmpayment',
                canActivate: [userAuthGuard],
                component: ConfirmPaymentComponent
            }
        ]
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
                component: AddMovieComponent
            },
            {
                path: 'moviemanagement/editmovie/:movieId',
                component: EditMovieComponentComponent
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
                path: 'movierequests',
                canActivate: [distributerAuthGuard],
                component: ApproveRejectMovieRequestComponent
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
            },
            {
                path: 'distributors',
                canActivate: [theaterOwnerAuthGuard],
                component: DistributerListingComponent
            },
            {
                path: 'distributors/:distributerId',
                canActivate: [theaterOwnerAuthGuard],
                component: MovieLisingBasedOnDistributerComponent
            },
            {
                path: 'myrequests',
                canActivate: [theaterOwnerAuthGuard],
                component: MyMovieRequestsComponent
            },
            {
                path: 'mymoviescollection',
                canActivate: [theaterOwnerAuthGuard],
                component: MyMovieCollectionComponent
            },
            {
                path: 'managetheater/:theaterId',
                canActivate: [theaterOwnerAuthGuard],
                component: SingletheatermangeComponent,
                children: [
                    {
                        path: '',
                        canActivate: [theaterOwnerAuthGuard],
                        component: ScreensComponent
                    },
                    {
                        path: 'addscreen',
                        canActivate: [theaterOwnerAuthGuard],
                        component: AddscreensComponent
                    },
                    {
                        path: 'manageschedule/:screenId',
                        canActivate: [theaterOwnerAuthGuard],
                        component: ManageScheduleComponent
                    },
                    {
                        path: 'manageschedule/:screenId/addschedule',
                        canActivate: [theaterOwnerAuthGuard],
                        component: AddScheduleComponent
                    }
                ]
            },
        ]
    }
];
