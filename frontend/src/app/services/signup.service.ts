import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MessageService } from "../core/message/message.service";

@Injectable({ providedIn: 'root' })
export class SignupService {
    private url = `${environment.baseUrl}auth`;

    constructor(private http: HttpClient, private message: MessageService, private router: Router) { }

    createUser(user: {}) {
        this.http.post(`${this.url}/user`, user).subscribe(
            () => {
                this.message.showSuccess('Account created. Please log in.');
                this.router.navigate(['/']);
            },
            err => this.message.showError('Account creation failed.')
        );
    }

    isUsernameTaken(username: string): Observable<boolean> {
        let params = new HttpParams().set('username', username);
        return this.http.get<boolean>(`${this.url}/isTaken`, { params: params });
    }
}
