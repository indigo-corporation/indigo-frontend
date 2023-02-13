import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
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
  genre:any
  type:any
  category:any

  nameType = {
    film:"Фильмы",
    serial:"Сериалы",
    anime:"Аниме",
    cartoon:"Мультфильмы"
  }
  constructor(
    private api2Service: api2Service, 
    private router: Router, 
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title) { }

    myOptions = {
      'placement': 'left',
      'theme': 'dark',
      'showDelay': 500,
    }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.type = this.route.snapshot.paramMap.get("type")
    this.getGenreFilms(this.id,1,this.type)
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

  getGenreFilms(id,page,type) {
    this.api2Service.getGenreFilms(id,page,type).subscribe((data) => {
      this.data = data.data.items
    });
  }

  onPageChange(query, page) {
    this.page = page
    this.router.navigate(["/genre/" + this.id], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    });
    this.getGenreFilms(this.id,page,this.type)
  }
}
