import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = this.tokenService.getToken();

        if (this.tokenService.hasToken()) {
            request = request.clone({
                setHeaders: {
                    'Authorization': this.tokenService.getToken(),
                }
            });
        }

        console.log(request);
        return next.handle(request);
    }
}