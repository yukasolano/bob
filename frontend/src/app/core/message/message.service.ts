import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(private snackBar: MatSnackBar) { }

    showError(msg: string) {
        this.openSnackBar(msg, 'Close', 'snackbar-error');
    }

    showSuccess(msg: string) {
        this.openSnackBar(msg, 'Close', 'snackbar-success');
    }

    openSnackBar(message: string, action: string, cssClass: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
            panelClass: cssClass
        });
    }
}