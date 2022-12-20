import { Injectable } from '@angular/core';
import { AlertifyService } from "./services/alertify.service"
import { RegisterComponent } from './auth-popup/register/register.component';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { authService } from './services/authService.service';

@Injectable({
  providedIn:"root"
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertify:AlertifyService, private auth:authService) {}

  
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log("HTTP Request started");
    
    return next.handle(request)
      .pipe (
        catchError((error: HttpErrorResponse) => {
          const errorCode = error.error.data.code
          if (errorCode == 120) {
            return throwError(error);
          }
          if (error.status == 404) {
            return throwError(error);
          }
          const errorMessage = error.error.data.message
          this.alertify.error(errorMessage);
          return throwError(error);
        })
      );
  } 
}
