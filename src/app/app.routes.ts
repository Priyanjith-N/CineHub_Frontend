import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/user/login-page/login-page.component';
import { HomePageComponent } from './features/home/user/home-page/home-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: '',
        component: HomePageComponent
    }
];
