import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../services/api.service';
import { api2Service } from '../services/api2.service';
import { Meta, Title } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() films: any
  @Input() serials: any
  @Input() anime: any
  @Input() cartoons: any
  @Input() new: any
  login
  loader:boolean = true
  userFavorite
  constructor(
    private apiService: api,
    private api2Service: api2Service,
    private spinner: NgxSpinnerService,
    private meta: Meta,
    private auth: authService,
    private title: Title) { }

  ngOnInit() {
    /* this.spinner.show(); */
    this.auth.user$.subscribe(x => {
      this.login = x != null
      if (this.login) {
        let user = x
        this.userFavorite = user ? user.favorite_film_ids : [];
      }
    })
    this.title.setTitle("Смотреть фильмы и сериалы онлайн в хорошем качестве 720p hd и без регистрации")
    this.getData()
  }

  getData() {
    this.api2Service.getFilmsMain().subscribe((data) => {
      this.films = data.data.film
      this.serials = data.data.serial
      this.anime = data.data.anime
      this.cartoons = data.data.cartoon
      this.new = data.data.new
      this.loader = false
      this.spinner.hide();
      if (this.userFavorite) {
        this.anime.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
        this.films.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
        this.serials.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
         this.cartoons.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
        this.new.forEach(item => {
          item.isFavorite = this.userFavorite.includes(item.id);
        });
      }
  
    });

  }
}