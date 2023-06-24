import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  animations: [
    trigger('enterAnimationPage', [
      transition(':enter', [
        style({ height: '0', opacity: '0', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '*', opacity: '1', overflow: 'hidden' }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '0', opacity: '0', overflow: 'hidden' }))
      ])
    ]
    )
  ],
  styleUrls: ['./copyright.component.scss']
})

export class CopyrightComponent implements OnInit {
  url: string = window.location.href;
  defaultImage = "../../assets/favicon.ico"  
  constructor(
    private meta:Meta,
    private title:Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Правообладателям и рекламодателям")
    this.updateMetaTags()
    this.meta.addTag(
      {name:"description", content: "Copyright, Авторские права, Рекламодателям, обратная связь, Реклама"})
  }

  updateMetaTags() {
    this.meta.updateTag({ name: 'og:title', content: 'Правообладателям и рекламодателям' });
    this.meta.updateTag({ name: 'og:description', content: "Смотреть фильмы сериалы, мультфильмы и аниме онлайн в хорошем качестве 720p 1080p hd и без регистрации"});
    this.meta.updateTag({ name: 'og:image', content: this.defaultImage});
    this.meta.updateTag({ name: 'vk:image', content: this.defaultImage});
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name:'og:site_name', content:'IndigoFilms' });
  }

}
