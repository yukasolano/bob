import { NgModule } from '@angular/core';
import { JwtInterceptor } from './jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
    providers: [
        JwtInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
    ],
})
export class JwtInterceptorModule { }