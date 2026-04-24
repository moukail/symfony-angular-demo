import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { take, switchMap, catchError, tap, filter } from 'rxjs/operators';

import { selectAccessToken } from '../selectors/auth.selectors';
import { refreshTokenTrigger } from '../actions/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectAccessToken).pipe(
            take(1),
            switchMap(token => {
                return this.handleRequest(req, next, token);
            })
        );
    }

    private handleRequest(req: HttpRequest<any>, next: HttpHandler, token: string | null): Observable<HttpEvent<any>> {
        const authReq = token ? this.addToken(req, token) : req;

        return next.handle(authReq).pipe(
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('/login_check') && !req.url.includes('/token/refresh')) {
                    return this.handle401Error(req, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(originalRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.store.select(selectAccessToken).pipe(
                take(1),
                tap((oldToken: string | null) => {
                    this.store.dispatch(refreshTokenTrigger());
                }),
                switchMap(oldToken => {
                    return this.store.select(selectAccessToken).pipe(
                        // Wait for a token that is neither null nor the old one
                        filter((newToken: string | null) => newToken !== null && newToken !== oldToken),
                        take(1)
                    );
                }),
                switchMap((newToken: string | null) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(newToken);
                    return next.handle(this.addToken(originalRequest, newToken!));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
                filter((token: string | null) => token !== null),
                take(1),
                switchMap((token: string | null) => {
                    return next.handle(this.addToken(originalRequest, token!));
                })
            );
        }
    }
}
