import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ActivatedRoute, Router } from '@angular/router';
import { api2Service } from '../services/api2.service';

@Injectable({
    providedIn: 'root'
})

export class favoriteService {
    favorite$ = new BehaviorSubject<any>(null);
    favoriteFilmIds
    constructor(private http: HttpClient,private router: Router,
        private route: ActivatedRoute, private api2Service:api2Service) {

    }


    getFavoriteArray() {
        let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
        
        if (favoriteFilmIds) {
          debugger
        favoriteFilmIds = JSON.parse(favoriteFilmIds)
         this.favoriteFilmIds = favoriteFilmIds
         this.favorite$.next(this.favoriteFilmIds) 
        } else { 
        this.api2Service.getFavoriteArray().subscribe((data) => {
         favoriteFilmIds = data.data
        
        localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds))
         this.favoriteFilmIds = favoriteFilmIds 
         this.favorite$.next(this.favoriteFilmIds) 
         }) 
       }
        
      }
}
