import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor( private meta: Meta,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle("Страница не найдена")
  }

}
