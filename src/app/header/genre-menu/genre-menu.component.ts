import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { api2Service } from 'src/app/services/api2.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-genre-menu',
  templateUrl: './genre-menu.component.html',
  styleUrls: ['./genre-menu.component.scss']
})
export class GenreMenuComponent implements OnInit {
  data:any
  totalRecords:any
  genres:any
  genre:any
  newArray:[]
  category
  public id :any
  @Input() type: any= ""
  constructor(
    private api2Service:api2Service,
    private router:Router, 
    private route:ActivatedRoute
  ) { 
   /*  this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    }); */ 
  }

    ngOnInit() {
    if (this.type=="anime") {
      this.getGenresAnime()
    } else {
      this.getGenres()
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.category = this.route.snapshot.params.category
  } 

  getGenres() {
    let ls = localStorage.getItem("genres")
    if (ls) {
      this.genres = JSON.parse(ls)
    }
    else {
        this.api2Service.getGenre().subscribe((data) => {
            localStorage.setItem("genres", JSON.stringify(data.data)) 
            this.genres = data.data
        });
    }
}
getGenresAnime() {
    let ls = localStorage.getItem("genresAnime")
    if (ls) {
      this.genres = JSON.parse(ls)
    }
    else {
        this.api2Service.getGenre(1).subscribe((data) => {
            localStorage.setItem("genresAnime", JSON.stringify(data.data)) 
            this.genres = data.data
        });
    }
}

  getfind(id) {
    this.api2Service.getfind(id).subscribe((data) => {
      this.genres = data;
    });
  }
}
