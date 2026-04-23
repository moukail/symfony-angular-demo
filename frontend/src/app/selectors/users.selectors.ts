import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, UsersState } from '../reducers/users.reducers';

export const selectUsersState =
  createFeatureSelector<UsersState>('users');

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllUsers = createSelector(
  selectUsersState,
  selectAll
);

export const selectUserEntities = createSelector(
  selectUsersState,
  selectEntities
);

export const selectLoading = createSelector(
  selectUsersState,
  s => s.loading
);

export const selectTotal = createSelector(
  selectUsersState,
  s => s.total
);

export const selectLoadedPages = createSelector(
  selectUsersState,
  s => s.loadedPages
);