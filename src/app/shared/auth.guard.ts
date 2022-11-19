import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from '../services/authService.service';

@Injectable({
    providedIn: "root"
})

export class AuthGuard implements CanActivate {
navigate:any
    constructor(private auth: authService, private router: Router,private route: ActivatedRoute) { }

    canActivate() {
        if (this.auth.isLogIn()) {
            return true
        } else {
            this.router.navigate(['/']);
            return false;
        }   
    }

}