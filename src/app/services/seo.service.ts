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

   displayColumns = ['description']

   initDefaultMetaInfomation() {
    this.title.setTitle("IndigoFilms")

    this.metaTag.addTags([
      {name:"description", content: "смотреть фильм"},
      {name:"viewport", content:"width=device-width, initial-scale=1"},
      {name:"author", content: "IndigoFilm"},
      {name:"robots", content: "index, follow"},
      {name:"description", content: "смотреть фильм"},
      {name:"keywords", content: "смотреть фильм, "},
      {name:"og:title", content: "Лучшие фильмы - смотреть онлайн бесплатно в хорошем качестве"},
      {name:"og:description", content: "Смотреть лучшие фильмы онлайн в хорошем HD качестве"},

      
    ]);
}

}
