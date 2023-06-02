import { Injectable } from '@angular/core';
import { AlertifyService } from "./services/alertify.service"
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
  errorMessage:any

  constructor(private alertify:AlertifyService, private auth:authService) {}

  
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    
    return next.handle(request)
      .pipe (
        catchError((error: HttpErrorResponse) => {
          if (!error?.error?.data?.code) {
            return throwError(error);
          }
          const errorCode = error.error.data.code
          if (errorCode == 120) {
            return throwError(error);
          }
        /*  if (error.status == 422) {
            return throwError(error);
          }  */
          if (error.status == 404) {
            return throwError(error);
          }
          if (error.status == 404) {
            return throwError(error);
          }
          if (error.status == 401) {
            localStorage.clear()
            window.location.replace("")
            return throwError(error);
          }
          this.errorMessage = error.error.data.message
          debugger
          if (this.errorMessage == "The email has already been taken.") {
            this.errorMessage = "Эмейл занят"
          }
         
          this.alertify.error(this.errorMessage);
          return throwError(error);
        })
      );
  } 
}
