import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import * as e from "express";

@Injectable({
    providedIn: 'root'
})

export class userService {
    readonly url = "https://api.indigofilms.online/"
    constructor(private http: HttpClient) {

    }

    get(method, params) {
        let url = this.url + method + "?"
        for (var key in params) {
            url += "&" + key + "=" + params[key]
        }
        console.log(this.http.get<any>(url));

        return this.http.get<any>(url)
    }

    post(method, body) {
        let url = this.url + method
        console.log(url, body);
        return this.http.post<any>(url, body)
    }

    changePassUs(password): Observable<string> {
        return this.post("users/change-pass", { password: password })
    }

    country(name = ""): Observable<string> {
        return this.get("world/countries-for-select", { name: name })
    }

    city(country_id, name = ""): Observable<string> {
        return this.get("world/cities-for-select", { country_id: country_id, name: name })
    }

    userChangeInfo(info): Observable<string> {
        return this.post("users/change-info", info)
    }

    getPicture(selectedFile:File): Observable<string> {
        const fd = new FormData();
        fd.append("picture",selectedFile,selectedFile.name)
        return this.post("users/change-picture", fd) 
    }
}