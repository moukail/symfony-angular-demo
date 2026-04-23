import { createAction, props } from '@ngrx/store';
import { User } from '../models';

export const loadUsers = createAction(
  '[Users] Load Users',
  props<{ page: number }>()
);

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{
    users: User[];
    page: number;
    total: number;
  }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);