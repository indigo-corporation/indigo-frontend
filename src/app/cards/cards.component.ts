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
  totalRecords: number
  page: number
  name: any
  log: any
  totalPages:any
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
    
    this.page=this.route.snapshot.queryParams.page
    if(!this.page) {
      this.page = 1 
    }

    this.category = this.route.snapshot.url[0].path
    if (this.category === "film") {
      this.title.setTitle("Смотреть Фильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Фильмы, Фильм, Смотреть фильмы онлайн, фильмы HD, совместный просмотр" })
    }

    if (this.category === "serial") {
      this.title.setTitle("Смотреть Сериалы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Сериалы, сериал, Смотреть сериалы онлайн, сериалы HD, совместный просмотр" })
    }

    if (this.category === "cartoon") {
      this.title.setTitle("Смотреть Мультфильмы в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Мультфильмы, Мультфильмсериалы, Мультфильтсериал, Смотреть Мультфильмы онлайн, Мультфильмы HD, совместный просмотр" })
    }

    if (this.category === "anime") {
      this.title.setTitle("Смотреть Аниме в хорошем качестве в 720p hd")
      this.meta.addTag(
        { name: "description", content: "Аниме, Анимесериалы, Анимесериал, Смотреть Аниме онлайн, Аниме HD, совместный просмотр" })
    }
    this.getData(1);
  }
  getData(page) {
    this.api2Service.getData(this.category, this.page).subscribe((data) => {
      this.data = data.data.items
      this.totalRecords = data.data.pagination.total
      this.totalPages = data.data.pagination.total_pages
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
