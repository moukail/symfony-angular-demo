import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';

import { selectRole } from '../selectors/account.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  role!: string;

  constructor(
    private store: Store,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  canActivate(): Observable<boolean> {

    return this.store.select(selectRole).pipe(
      take(1),
      map((role: string) => {
        this.role = role;
        console.log(this.role);
        return this.role === 'ROLE_ADMIN';
      }),
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          this.snackBar.open('Access Denied: Admin only', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['/']);
        }
      })
    );
  }
}

