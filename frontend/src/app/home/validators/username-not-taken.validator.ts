import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, first, map, switchMap } from "rxjs/operators";
import { SignupService } from "src/app/services/signup.service";

@Injectable({ providedIn: 'root' })
export class UsernameNotTakenValidator {
    constructor(private signupService: SignupService) { }

    checkUsernameTaken() {
        return (control: AbstractControl) => {
            return control.valueChanges.pipe(debounceTime(300))
                .pipe(switchMap(username => this.signupService.isUsernameTaken(username)))
                .pipe(map(isTaken => isTaken ? { usernameTaken: true } : null))
                .pipe(first());
        };
    }
}