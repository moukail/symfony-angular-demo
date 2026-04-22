import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export const selectAuthState =
  createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
  selectAuthState,
  state => state.accessToken
);

export const selectIsAuthenticated = createSelector(
  selectAccessToken,
  token => !!token
);
export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);
