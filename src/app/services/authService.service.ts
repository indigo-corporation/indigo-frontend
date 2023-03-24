import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import * as e from "express";
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})


export class authService {
    user$ = new BehaviorSubject<any>(null);

    readonly url = "https://api.indigofilms.online/api/"
    readonly apiKey = "1|jrWKPCXBPlgGmBp1YMqtnwW4pwesoCzuxNLqPk62"
    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute,) {
          
    }

    getUser() {
        let user = localStorage.getItem("user")
        if (user) {
            this.user$.next(JSON.parse(user))
        } if (this.getAuthToken()) {
            this.http.get(this.url + "auth/me").subscribe((data) => {
                if (data['state'] == true) {
                    let user = data['data']
                    user.poster_small = user.poster_small + "?d="+Date.now()
                    user.poster_medium = user.poster_medium + "?d="+Date.now()
                    user.poster_large = user.poster_large+ "?d="+Date.now() 
                    localStorage.setItem("user", JSON.stringify(user))
                    this.user$.next(user)
                }
            });
        }
    }


    isLogIn () {
        return !!this.getAuthToken()
    }

    getAuthToken(): string | null {
        return localStorage.getItem('token')
    }

    registerUser(data) {
        return this.http.post(this.url + "auth/register", data)
    }

    logInUser(data) {
        return this.http.post(this.url + "auth/login", data)
    }

    authTelegram(data) {
        return this.http.post(this.url + "auth/telegram", data)
    }

    authGoogle(data) {
        return this.http.post(this.url + "auth/google", data)
    }


    logOut() {
        return this.http.post(this.url + "auth/logout", null)
    }
}