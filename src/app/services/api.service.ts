import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class api {
    constructor(private http: HttpClient) { }

 /*    get(method, params) {
       
        let url = this.apiUrl + method
            for (var key in params) {
                url+="?"+key +"="+params[key] + "&" + this.apiKey
            }
            console.log(this.http.get<any>(url));
            
        return this.http.get<any>(url,{headers:headers})
    } */

    apiUrl = 'https://base.ashdi.vip/api/product/read_one.php';
    apiKey = '99a660-8378e4-4adb0a-eeeb92-86b677';
  
  
    getProduct(imdb: string): Observable<any> {
      const url = `${this.apiUrl}?imdb=${imdb}&api_key=${this.apiKey}`;
      return this.http.get<any>(url);
    }
}