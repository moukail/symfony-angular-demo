import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { login, loginSuccess, loginFailure, refreshTokenSuccess, logout, refreshTokenTrigger } from '../actions/auth.actions';
import { environment } from "../environments/environment";

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private router = inject(Router);
  private base = environment.apiUrl;

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.http.post<any>(this.base + '/login_check', {
          email,
          password
        }).pipe(
          map(res =>
            loginSuccess({
              accessToken: res.token,
              refreshToken: res.refresh_token
            })
          ),
          catchError(err =>
            of(loginFailure({ error: err.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => this.router.navigate(['/dashboard']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() => 
        this.http.post<any>(this.base + '/logout', {})
      ),
      tap(() => this.router.navigate(['/login']))
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(refreshTokenTrigger),
      switchMap(() => {
        const rt = localStorage.getItem('refresh_token');
        console.log('Attempting token refresh with:', rt ? rt.substring(0, 10) + '...' : 'null');
        
        return this.http.post<any>(this.base + '/token/refresh', {
          refresh_token: rt
        }).pipe(
          map(res => {
            console.log('Refresh token response:', res);
            if (!res.token || !res.refresh_token) {
              throw new Error('Invalid refresh response');
            }
            return refreshTokenSuccess({
              accessToken: res.token,
              refreshToken: res.refresh_token
            });
          }),
          catchError(err => {
            console.error('Refresh token failed:', err);
            return of(logout());
          })
        );
      })
    )
  );
}