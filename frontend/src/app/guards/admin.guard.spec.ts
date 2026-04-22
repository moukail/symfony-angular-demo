import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AdminGuard } from './admin.guard';
import { selectRole } from '../selectors/account.selectors';
import { firstValueFrom } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let store: MockStore;
  let router: { navigate: any };
  let snackBar: { open: any };

  beforeEach(() => {
    router = { navigate: vi.fn() };
    snackBar = { open: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        provideMockStore(),
        { provide: Router, useValue: router },
        { provide: MatSnackBar, useValue: snackBar }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is admin', async () => {
    store.overrideSelector(selectRole, 'ROLE_ADMIN');
    
    const allowed = await firstValueFrom(guard.canActivate());
    expect(allowed).toBe(true);
  });

  it('should deny activation and redirect if user is not admin', async () => {
    store.overrideSelector(selectRole, 'ROLE_USER');
    
    const allowed = await firstValueFrom(guard.canActivate());
    expect(allowed).toBe(false);
    expect(snackBar.open).toHaveBeenCalledWith('Access Denied: Admin only', 'Close', expect.any(Object));
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
