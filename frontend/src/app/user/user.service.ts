import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

import jwt_decode from 'jwt-decode';
import { TokenService } from '../auth/token.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    private userSubject = new BehaviorSubject<User>(null);

    constructor(private tokenService: TokenService) {
        console.log('userservice');
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    private decodeAndNotify() {
        console.log('decode');
        console.log(this.tokenService.getToken());
        const token = this.tokenService.getToken();
        console.log(jwt_decode(token));
        const user = jwt_decode(token) as User;
        console.log(user);


        this.userSubject.next(user);
    }
}