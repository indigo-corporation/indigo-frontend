import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import * as e from "express";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class userService {
    readonly url = environment.apiUrl;
    constructor(private http: HttpClient) {

    }

    get(method, params) {
        let url = this.url + method + "?"
        for (var key in params) {
            url += "&" + key + "=" + params[key]
        }

        return this.http.get<any>(url)
    }

    post(method, body) {
        let url = this.url + method
        return this.http.post<any>(url, body)
    }

    changePassUs(password): Observable<string> {
        return this.post("users/change-pass", { password: password })
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