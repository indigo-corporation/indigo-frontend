import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ActivatedRoute,  Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from '../services/authService.service';

@Injectable({
    providedIn: "root"
})

export class AuthGuard implements CanActivate {
navigate:any
currentPage
allowedRoutes: string[] = ['/reg'];
    constructor(private auth: authService, private router: Router,private route: ActivatedRoute) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              // Обновляем текущую страницу при каждом событии NavigationEnd
              this.currentPage = event.url;
            }
          });
     }

    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
        if (this.auth.isLogIn()) {
            if (this.allowedRoutes.includes(state.url)) {
                // Если текущий маршрут находится в разрешенных, перенаправляем пользователя на главную страницу
                this.router.navigate(['/']);
                return false;
              }
            return true;
          } else {
            if (state.url === '/reg') {
              return true;
            }
            // Если пользователь не авторизован, перенаправляем его на главную страницу
            this.router.navigate(['/']);
            return false;
          }
        }
}