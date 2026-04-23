import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as UsersActions from '../actions/users.actions';
import { User } from '../models';

export interface UsersState extends EntityState<User> {
  loading: boolean;
  error: string | null;

  page: number;
  limit: number;
  total: number;

  loadedPages: Record<number, boolean>;
}

export const adapter = createEntityAdapter<User>({
  selectId: u => u.id,
  sortComparer: (a, b) => a.email.localeCompare(b.email)
});

export const initialState: UsersState = adapter.getInitialState({
  loading: false,
  error: null,

  page: 1,
  limit: 10,
  total: 0,

  loadedPages: {}
});

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.loadUsers, (state, { page }) => ({
    ...state,
    loading: true,
    page
  })),

  on(UsersActions.loadUsersSuccess, (state, { users, page, total }) =>
    adapter.upsertMany(users, {
      ...state,
      loading: false,
      total,
      loadedPages: {
        ...state.loadedPages,
        [page]: true
      }
    })
  ),

  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);