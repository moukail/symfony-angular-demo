import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store) {}

  login(email: string, password: string) {
    this.store.dispatch(login({ email, password }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}