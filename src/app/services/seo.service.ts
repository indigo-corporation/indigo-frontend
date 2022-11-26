import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser'; 

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private readonly metaTag:Meta,
    private readonly title:Title
  ) {

   }

   initDefaultMetaInfomation() {
    this.title.setTitle("IndigoFilms")

    this.metaTag.addTags([
      {name:"viewport", content:"width=device-width, initial-scale=1"},
      {name:"author", content: "IndigoFilm"},
      {name:"language", content: "ru"},
      {name:"robots", content: "index, follow"},
      {name:"description", content: "Смотри фильмы и сериалы онлайн на IndigoFilm, ОРИГИНАЛЬНЫЙ сайт IndigoFilm, большая база фильмов и сериалов онлайн!"},
      {name:"keywords", content: "Фильмы, Сериалы, Аниме, Мультфильмы"},
      {name:"og:title", content: "Лучшие фильмы - смотреть онлайн бесплатно в хорошем качестве"},
      {name:"og:description", content: "Смотреть лучшие фильмы онлайн в хорошем HD качестве"},
    ]);
}

}
