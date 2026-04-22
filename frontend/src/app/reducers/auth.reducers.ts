import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, refreshTokenSuccess, logout } from '../actions/auth.actions';

export interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  on(login, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loginSuccess, (state, { accessToken, refreshToken }) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    return {
      ...state,
      accessToken,
      refreshToken,
      loading: false
    };
  }),

  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(refreshTokenSuccess, (state, { accessToken, refreshToken }) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    return {
      ...state,
      accessToken,
      refreshToken
    };
  }),

  on(logout, () => {
    localStorage.clear();
    return initialAuthState;
  })
);
