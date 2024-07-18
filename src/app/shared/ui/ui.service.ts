import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class UIService {
    
    constructor(private snackbar: MatSnackBar) {}

    showSnackbar(error: string, action: string, duration: number) {
        this.snackbar.open(error, action, {
            duration: duration
        });
    }
}