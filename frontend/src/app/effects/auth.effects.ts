import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { login, loginSuccess, loginFailure, refreshTokenSuccess, logout } from '../actions/auth.actions';
import { environment } from "../environments/environment";

@Injectable()
export class AuthEffects {

  private base = environment.apiUrl;

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) =>
        this.http.post<any>(this.base + '/api/login_check', {
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
      ofType('[Auth] Refresh Trigger'), // optional internal trigger
      switchMap(() =>
        this.http.post<any>(this.base + '/api/token/refresh', {
          refresh_token: localStorage.getItem('refresh_token')
        }).pipe(
          map(res =>
            refreshTokenSuccess({
              accessToken: res.token,
              refreshToken: res.refresh_token
            })
          ),
          catchError(() => of(logout()))
        )
      )
    )
  );
}