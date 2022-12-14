import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})

export class CopyrightComponent implements OnInit {

  constructor(
    private meta:Meta,
    private title:Title
  ) { }

  ngOnInit() {
    this.title.setTitle("Правообладателям и рекламодателям")

    this.meta.addTag(
      {name:"description", content: "Copyright, Авторские права, Рекламодателям, обратная связь, Реклама"})
  }

}
