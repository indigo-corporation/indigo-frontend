import { Component, OnInit,Input} from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../services/api.service';
import { api2Service } from '../services/api2.service';
import { Meta, Title } from '@angular/platform-browser';


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

  constructor(
    private apiService: api,
    private api2Service: api2Service,
    private meta: Meta,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Смотреть фильмы и сериалы онлайн в хорошем качестве 720p hd и без регистрации")
    this.films = this.getData("film")
    this.serials = this.getData("serial")
    this.anime = this.getData("anime")
    this.cartoons = this.getData("cartoons")
  }

  getData(category: string) {
    this.api2Service.getFilmsMain().subscribe((data) => {
      this.films = data.data.films
      debugger
      this.serials = data.data.serials
      this.anime = data.data.anime
      this.cartoons = data.data.cartoons
    });

  }
}