import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  category: any
  term: any;
  totalRecords: string
  page: number
  name: any
  log: any
  film: any
  @Input() data: any
  public id: any
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private title: Title
  ) {
    this.data = new Array<any>()

  }
  ngOnInit() {
  

    this.category = this.route.snapshot.url[0].path
    if (this.category === "film") {
      this.title.setTitle("Фильмы")
      this.meta.addTag(
        { name: "description", content: "Фильмы, Фильм, Смотреть фильмы онлайн, фильмы HD, совместный просмотр" })
    }

    if (this.category === "serial") {
      this.title.setTitle("Сериалы")
      this.meta.addTag(
        { name: "description", content: "Сериалы, сериал, Смотреть сериалы онлайн, сериалы HD, совместный просмотр" })
    }

    if (this.category === "cartoon") {
      this.title.setTitle("Мультфильмы")
      this.meta.addTag(
        { name: "description", content: "Мультфильмы, Мультфильмсериалы, Мультфильтсериал, Смотреть Мультфильмы онлайн, Мультфильмы HD, совместный просмотр" })
    }

    if (this.category === "anime") {
      this.title.setTitle("Аниме")
      this.meta.addTag(
        { name: "description", content: "Аниме, Анимесериалы, Анимесериал, Смотреть Аниме онлайн, Аниме HD, совместный просмотр" })
    }
    this.page = this.route.snapshot.queryParams.page
    if (!this.page) {
      this.page = 1
    }
    console.log(this.route.snapshot.queryParams.page);

    this.getData(this.page);
    console.log(this.category);
  }
  getData(page) {
    this.api2Service.getData(this.category, page).subscribe((data) => {
      console.log(data);
      this.data = data.data.items
      this.totalRecords = data.data.pagination.total
      console.log(this.totalRecords);
    });
  }
  onPageChange(page) {
    this.page = page
    this.router.navigate(["/" + this.category], {
      relativeTo: this.route,
      queryParams: {
        page: this.page
      }
    });
    this.getData(page)
  }
}
