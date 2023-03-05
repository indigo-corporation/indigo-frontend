import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class api {
    constructor(private http: HttpClient) { }

    url
/*     ?imdb=tt0988824&api_key=99a660-8378e4-4adb0a-eeeb92-86b677 */

    ashdiPlayer(imdb):Observable<any> {
      return this.get("product/read_one.php",{imdb:imdb})
    }


    get(method, params = {}) {
      let headers = this.createAuthorizationHeader()
      this.url ="http://base.ashdi.vip/api/"
      let apikey="api_key=99a660-8378e4-4adb0a-eeeb92-86b677"
      let url = this.url + method + "?"
      for (var key in params) {
          url+=key+"="+params[key] + "&"+ apikey  
      }          
      debugger
        return this.http.get<any>(url,
          { headers: headers })
    }
    createAuthorizationHeader() {
      let headers = new HttpHeaders()
        .set("apikey", "99a660-8378e4-4adb0a-eeeb92-86b677")
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + "99a660-8378e4-4adb0a-eeeb92-86b677")
      return headers    
    }


}