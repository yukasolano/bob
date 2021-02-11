import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private userService: UserService) { }

    authenticate(username: string, password: string) {
        let url = `${environment.baseUrl}auth/login`;
        return this.http.post<Observable<boolean>>(url, {
            username: username,
            password: password
        }, { observe: 'response' }).pipe(tap(res => {
            this.userService.setToken(res.headers.get('Authorization'));
        }));

    }
}