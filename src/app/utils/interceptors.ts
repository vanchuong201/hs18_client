import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        let clone = req;
        let token = localStorage.getItem('access_token');
        if (token) {
            clone = req.clone({
                setHeaders: {
                    Authorization: localStorage.getItem('access_token')
                }
            });
        }
        return next.handle(clone).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error);
        let message = 'Đã xảy ra lỗi, vui lòng thử lại sau.';
        if (error.error.message) {
            message = error.error.message;
        }
        return throwError(message);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
