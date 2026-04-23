import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { authReducer } from './reducers/auth.reducers';
import { accountReducer } from './reducers/account.reducers';
import { usersReducer } from './reducers/users.reducers';
import { AuthEffects } from './effects/auth.effects';
import { UsersEffects } from './effects/users.effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
    provideStore({
      auth: authReducer,
      account: accountReducer,
      users: usersReducer,
    }),
    importProvidersFrom(MatSnackBarModule),
    provideEffects([AuthEffects, UsersEffects])
  ]
};
