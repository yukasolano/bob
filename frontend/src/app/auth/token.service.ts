import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {

    hasToken(): boolean {
        return !!this.getToken();
    }

    setToken(token: string): void {
        window.localStorage.setItem('token', token);
    }

    getToken(): string {
        return window.localStorage.getItem('token');
    }

    removeToken(): void {
        window.localStorage.removeItem('token');
    }
}