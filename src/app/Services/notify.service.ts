import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyServiceService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action: string): void {
    let config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: 'primary',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, action, config);
  }

  fail(message: string, action: string): void {
    let config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: 'warn',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, action, config);
  }
}
