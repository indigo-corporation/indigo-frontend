import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import * as e from "express";

@Injectable({
    providedIn: 'root'
})

export class api2Service {
    
    readonly url = "https://api.indigofilms.online/api/"
    constructor(private http: HttpClient) {

    }


    get(method, params={}) {
        let url = this.url + method + "?"
            for (var key in params) {
                url+="&"+key+"="+params[key]    
            }
            console.log(this.http.get<any>(url));
            
        return this.http.get<any>(url)
    }

    post(method, body) {
        let url = this.url + method
        console.log(url,body);
       return this.http.post<any>(url, body)
    }

    getComments(id,page = 1): Observable<any> {
        return this.get("films/"+id+"/get_comments", {page:page} )
    }
    
    postStars(film_id,count): Observable<any> {
        return this.post("film-stars/add", {film_id:film_id, count:count} )
    }
    

    postComment(filmId:number,body,parentId=null): Observable<any> {
        return this.post("comments/store", {
            filmId:filmId, body:body, parentId:parentId} )
    }

    postLike(comment_id:number,is_like): Observable<any> {
        return this.post("comments/like", {
            comment_id:comment_id, is_like:is_like} )
    }
    
    postUnLike(comment_id:number): Observable<any> {
        return this.post("comments/unlike", {
            comment_id:comment_id} )
    }

    postFavorite(film_id): Observable<any> {
        return this.post("favorite-films/add", {
            film_id:film_id
        })
    }
    removeFavorite(film_id): Observable<any> {
        return this.post("favorite-films/remove", {
            film_id:film_id
        })
    }

    userGet(user_id): Observable<any> {
        return this.get("users/"+ user_id)
    }

    getFavoriteArray(): Observable<any> {
        return this.get("favorite-films/all-ids")
    }
    getFavoriteFilms(): Observable<any> {
        return this.get("favorite-films/all")
    }

    

    search(find, page): Observable<any> {
        return this.get("films/search", {page:page, find:find } )
    }

    getData(type = "", page = 1): Observable<any> {
        let params = {page:page}
        if(type) {
             params["type"] = type
        }
        return this.get("films", params )
    }

    getfind(id): Observable<any> {
        return this.get("films/"+ id)
    }

    getGenreFilms(id,page, type): Observable<any> {
        return this.get("films/genre/" + id, {page:page, type:type} )
    }

    getGenre(is_anime:number=0): Observable<any> {
        return this.get("genres", {is_anime:is_anime} )
    }
}