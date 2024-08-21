import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';

// interceptors
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorHandleingInterceptor } from './core/interceptors/error-handleing.interceptor';

import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withInterceptors([authInterceptor, errorHandleingInterceptor])),
    provideAnimations(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.GOOGLE_PROVIDER_CLIENT_ID)
          }
        ],
        onError: (err: any) => {
          console.error(err, 'error from provider');
        }
      } as SocialAuthServiceConfig,
    }
  ]
};
