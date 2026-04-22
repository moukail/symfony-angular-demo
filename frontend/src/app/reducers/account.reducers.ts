import { createReducer, on } from "@ngrx/store";
import { loginSuccess, logout, refreshTokenSuccess } from "../actions/auth.actions";
import { decodeToken } from "../utils/jwt.utils";

export interface AccountState {
  isActive: boolean;
  roles: string[];
}

const token = localStorage.getItem('access_token');
const decoded = token ? decodeToken(token) : null;

export const initialAccountState: AccountState = {
  isActive: !!token,
  roles: decoded?.roles || []
};

export const accountReducer = createReducer(
  initialAccountState,

  on(loginSuccess, refreshTokenSuccess, (state, { accessToken }) => {
    const decoded = decodeToken(accessToken);
    return {
      ...state,
      isActive: true,
      roles: decoded?.roles || []
    };
  }),

  on(logout, () => ({
    isActive: false,
    roles: []
  }))
);
