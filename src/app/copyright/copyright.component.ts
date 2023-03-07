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
