import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { loadUsers, loadUsersSuccess, loadUsersFailure } from '../actions/users.actions';
import { selectLoadedPages } from '../selectors/users.selectors';
import { environment } from "../environments/environment";

@Injectable()
export class UsersEffects {

  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);
  private base = environment.apiUrl;

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),

      withLatestFrom(this.store.select(selectLoadedPages)),

      filter(([{ page }, loaded]) => !loaded[page]),

      switchMap(([{ page }]) =>
        this.http.get<any>(`${this.base}/v1/users?page=${page}`).pipe(
          map(res =>
            loadUsersSuccess({
              users: res.data,
              page,
              total: res.meta.total
            })
          ),
          catchError(err =>
            of(loadUsersFailure({ error: err.message }))
          )
        )
      )
    )
  );
}