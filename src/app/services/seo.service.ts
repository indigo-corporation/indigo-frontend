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
      {name:"author", content: "IndigoFilms"},
      {name:"language", content: "ru"},
      {name:"robots", content: "index, follow"},
      {name:"description", content: "Смотри фильмы и сериалы онлайн на IndigoFilms, ОРИГИНАЛЬНЫЙ сайт IndigoFilms, большая база фильмов и сериалов онлайн!, индигофилмс, индиго филмс, indigofilms, indigo films индигофилмс, индиго филмс, indigofilms, indigo films"},
      {name:"keywords", content: "Фильмы, Сериалы, Аниме, Мультфильмы, индигофилмс, индиго филмс, indigofilms, indigo films"},
    ]);
}

}
