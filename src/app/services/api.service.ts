import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class api {
    readonly apiKey = "api_key=2f260335bbb14d853ded353267749758"
    readonly apiUrl = "https://api.themoviedb.org/3/"
    readonly lang = "language=ru"
    constructor(private http: HttpClient) { }

    get(method, params) {
        let url = this.apiUrl + method + "?" + this.apiKey + "&" + this.lang
            for (var key in params) {
                url+="&"+key+"="+params[key]
            }
            console.log(this.http.get<any>(url));
            
        return this.http.get<any>(url)
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