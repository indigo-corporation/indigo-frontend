import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


import { Result } from '../models/resultFilmsType';
import { CommentResult } from '../models/getComments';
import { postComment } from '../models/postComment';
import { postStars } from '../models/postStars';
import { postLike } from '../models/postLike';
import { postUnLike } from '../models/postUnLike';
import { postFavorite } from '../models/postFavorite';
import { getFavorite } from '../models/getFavorite';
import { search } from '../models/search';

import { getLocalFavorite } from '../models/getLocalFavorite';
import { getFindItem } from '../models/getFindItem';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class api2Service {
    readonly url = environment.apiUrl;
    constructor(private http: HttpClient) {

    }


    get (method, params={}) {
        let url = this.url + method + "?"
            for (var key in params) {
                url+="&"+key+"="+params[key]    
            }       
        return this.http.get<any>(url)
    }

    post (method, body) {
        let url = this.url + method
       return this.http.post<any>(url, body)
    }

    getComments(id,page = 1): Observable<CommentResult> {
        return this.get("films/"+id+"/get_comments", {page:page} )
    }
    
    postStars(film_id,count): Observable<postStars> {
        return this.post("film-stars/add", {film_id:film_id, count:count} )
    }
    

    postComment(filmId:number,body,parentId=null): Observable<postComment> {
        return this.post("comments/store", {
            filmId:filmId, body:body, parentId:parentId} )
    }

    postLike(comment_id:number,is_like): Observable<postLike> {
        return this.post("comments/like", {
            comment_id:comment_id, is_like:is_like} )
    }
    
    postUnLike(comment_id:number): Observable<postUnLike> {
        return this.post("comments/unlike", {
            comment_id:comment_id} )
    }

    postFavorite(film_id): Observable<postFavorite> {
        return this.post("favorite-films/add", {
            film_id:film_id
        })
    }
    removeFavorite(film_id): Observable<any> {        /// пустая дата приходит
        return this.post("favorite-films/remove", {
            film_id:film_id
        })
    }

    userGet(user_id): Observable<any> {      /// еще в разработке
        return this.get("users/"+ user_id)
    }

    getFavoriteFilms(page = 1): Observable<getFavorite> {
        return this.get("favorite-films/all", {page:page})
    }

    search(find, page = 1, category = "", genre_id = "", country_id = "", year= ""): Observable<search> {
        let params = {page:page, find:find, genre_id:genre_id, country_id:country_id, year:year }
        if(category) {
            params["category"] = category
       }
        return this.get("films/search", params)
    }

    getData(category = "", page = 1, sortField ="date", sortDirection="desc", genre_id = "", country_id = "", year= ""): Observable<Result> {
        let params = {page:page, sort_field:sortField, sort_direction:sortDirection, genre_id:genre_id, country_id:country_id, year:year }
        if(category) {
             params["category"] = category
        }
        return this.get("films", params )
    }
    getCountryList(): Observable<any> {
    return this.get("world/film-countries")
    }
    
    getFilmsMain(): Observable<any> {
        return this.get("films/main")
    }

    getfind(id): Observable<getFindItem> {
        return this.get("films/"+ id)
    }

    getGenre(is_anime:number=0): Observable<any> {                         /// дата без итемов, жду
        return this.get("genres", {is_anime:is_anime} )
    }

    getRecommendations(id:number): Observable<any> {                         /// дата без итемов, жду
        return this.get("films/"+id+"/recommendations")
    }

}