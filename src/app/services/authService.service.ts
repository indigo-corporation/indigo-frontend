import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import * as e from "express";
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class authService {
    user$ = new BehaviorSubject<any>(null);


    readonly url = "http://indigo-films-api.herokuapp.com/api/"
    readonly apiKey = "1|jrWKPCXBPlgGmBp1YMqtnwW4pwesoCzuxNLqPk62"
    constructor(private http: HttpClient,private router: Router,
        private route: ActivatedRoute,) {

    }

    getUser() {
        let user = localStorage.getItem("user")
        if (user) {
            this.user$.next(user)
        } if (this.getAuthToken()) {
            this.http.get(this.url + "auth/me").subscribe((data) => {
                if (data['state'] == true) {
                    let user = data['data']
                    localStorage.setItem("user", JSON.stringify(user))
                    this.user$.next(user)
                    console.log(user);
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
        console.log(this.url)
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
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        this.user$.next(null)
        this.router.navigate([""])
        return this.http.post(this.url + "auth/logout", null)
    }
}