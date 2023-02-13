
import { Injectable } from '@angular/core';
import { AlertifyService } from "./services/alertify.service"
import { RegisterComponent } from './login and registration components/register/register.component';
import {
    HttpRequest,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { authService } from './services/authService.service';
import { HeaderComponent } from "./header/header.component"
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private alertify: AlertifyService, private auth: authService, private router: Router,
        private route: ActivatedRoute,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getAuthToken();

        if (token) {
            // If we have a token, we set it to the header
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401 && err.url !== "https://indigo-films.herokuapp.com/api/auth/logout") {
                        this.auth.logOut()
                        this.router.navigate([""])
                        console.log(err);
                    }
                }
                if (err.status === 404) {
                    this.router.navigate(["404"])
                    this.alertify
                }
                return throwError(err);
            })
        
        )
    }
}