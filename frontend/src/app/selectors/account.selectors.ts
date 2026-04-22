import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AccountState } from "../reducers/account.reducers";

export const selectAccountState =
    createFeatureSelector<AccountState>('account');

export const selectIsActive = createSelector(
    selectAccountState,
    (state: AccountState) => state.isActive
);

export const selectRole = createSelector(
    selectAccountState,
    (state: AccountState) => state.roles[0]
);