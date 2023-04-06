import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';
import { authService } from "../services/authService.service";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  animations: [
    trigger('enterAnimationArrow', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ]
    )
  ],
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  totalRecords: string
  data: any
  page: number = 1
  id: any
  term: any
  name: any
  genres: any
  favoriteFilmIds
  genre:any
  userFavorite
  type:any
  login
  loader:boolean = true

  category:any
  isSortAnime:boolean =false
  isSort:boolean = false
  sortField:string = "release_date"
  sortDirection:string ="desc"
  nameType = {
    film:"Фильмы",
    serial:"Сериалы",
    anime:"Аниме",
    cartoon:"Мультфильмы"
  }
  constructor(
    private api2Service: api2Service, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private auth: authService,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title) { }

    myOptions = {
      'placement': 'left',
      'theme': 'dark',
      'showDelay': 500,
    }

  ngOnInit() {
    this.spinner.show();
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
       this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })
    this.page=this.route.snapshot.queryParams.page
    if(!this.page) {
      this.page = 1 
    }
    this.category = this.route.snapshot.url[0].path

    if (this.category === "anime") {
      this.isSortAnime = true
      this.isSort = false
    } else {
      this.isSort = true
    }

    this.id = this.route.snapshot.paramMap.get('id')
    this.type = this.route.snapshot.paramMap.get("type")

    this.getGenreFilms(this.id,this.page,this.type)
    if(this.nameType[this.type] === "Аниме") {
      this.getGenreAnime() 
    } else {
      this.getGenre()
    }
    let typeName = this.nameType[this.type]
    this.title.setTitle("Смотреть " + typeName + " " + this.genre.title + " в хорошем качестве в 720p hd")
  }

  getGenre() {
    let ls = localStorage.getItem("genres")
    if (ls) {
      this.genres = JSON.parse(ls)
      this.genre = this.genres.filter(x => x.id == this.id)[0]
    }
    else {
        this.api2Service.getGenre().subscribe((data) => {
            localStorage.setItem("genres", JSON.stringify(data.data)) 
            this.genres = data.data.items
            this.genre = this.genres.filter(x => x.id == this.id)[0]
        });
    }
}

genreArrow(sortField) {
  let sortDirection = "desc"
  if(this.sortField === sortField) {
    sortDirection = this.sortDirection === "desc" ? "asc" : "desc"
  } 
  this.sortField = sortField
  this.sortDirection = sortDirection
  this.getGenreFilms(this.id,this.page,this.type)
}

arrowsUp(): void {
  const arrowElms = document.querySelectorAll(".arrow");
  if (arrowElms.length) {
    arrowElms.forEach((arrowElm) => {
      (arrowElm as HTMLElement).style.transform = "";
      (arrowElm as HTMLElement).style.color = "";
    });
  }
}

getGenreAnime() {
    let ls = localStorage.getItem("genresAnime")
    if (ls) {
      this.genres = JSON.parse(ls)
      this.genre = this.genres.filter(x => x.id == this.id)[0]
    }
    else {
        this.api2Service.getGenre(1).subscribe((data) => {
            localStorage.setItem("genresAnime", JSON.stringify(data.data)) 
            this.genres = data.data
            this.genre = this.genres.filter(x => x.id == this.id)[0]
        });
    }
}

  getGenreFilms(id,page,category) {
    this.api2Service.getGenreFilms(id,page,category,this.sortField,this.sortDirection).subscribe((data) => {
      this.data = data.data.items
      this.spinner.hide();
      this.loader = false
      if (this.userFavorite && this.data) {
        this.data.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }
      this.totalRecords = data.data.pagination.total
    });
  }

  onPageChange(page) {
    this.page = page
    this.router.navigate(["/" +this.type+"/genre/" + this.id], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    });
    this.getGenreFilms(this.id,this.page,this.type)
  }
}
