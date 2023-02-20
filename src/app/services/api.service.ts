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

    get(method: string, params: any = {}) {
       let headers = this.createAuthorizationHeader() 
       console.log(headers);
       
        let url = this.apiUrl + method
            for (var key in params) {
                url+="?"+key +"="+params[key] +"&" +this.apiKey
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

    getTopRated(page): Observable<any> {
        return this.get("movie/top_rated", {page:page} )
    }

    getListGenre(): Observable<any> {
        return this.get("genre/movie/list", {} )
    }

    getGenreFilms(id, page): Observable<any> {
        return this.get("discover/movie", {with_genres:id, page:page} )
    }

  getData(page = 1): Observable<any> {
        return this.get("movie/550/similar", {page:page} )
    } 

    search(query, page): Observable<any> {
        return this.get("search/movie", {page:page, query:query } )
    }

    find(id): Observable<any> {
        return this.get("movie/"+ id, {external_source:"imdb_id"} )
    }
}