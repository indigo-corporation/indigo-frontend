import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class api {
    readonly apiUrl = "https://base.ashdi.vip/api/"
    readonly apiKey = "api_key=99a660-8378e4-4adb0a-eeeb92-86b677"
    constructor(private http: HttpClient) { }

    get(method, params) {
       let headers = this.createAuthorizationHeader() 
       console.log(headers);
       
        let url = this.apiUrl + method
            for (var key in params) {
                url+="?"+key +"="+params[key] + "&" + this.apiKey
            }
            console.log(this.http.get<any>(url));
            
        return this.http.get<any>(url,{headers:headers})
    }

   createAuthorizationHeader() {
        let headers = new HttpHeaders()
          .set("api_key", "99a660-8378e4-4adb0a-eeeb92-86b677")
        return headers
      }
   

    getAshvid(imdb): Observable<any> {
        return this.get("product/read_one.php", {imdb:imdb})
    }
}