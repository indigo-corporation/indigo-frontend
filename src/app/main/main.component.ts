import { Component, OnInit } from '@angular/core';
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
 
  film:Observable<any>
  serial: Observable<any>
  anime: Observable<any>
  cartoon: Observable<any>
  constructor(
    private apiService: api,
    private api2Service: api2Service,
    private meta: Meta,
    private title: Title ) { }

  ngOnInit() {
  this.title.setTitle("Смотреть фильмы и сериалы онлайн в хорошем качестве 720p hd и без регистрации")
  this.film=this.getData("film")
   this.serial=this.getData("serial")
   this.anime=this.getData("anime")
   this.cartoon=this.getData("cartoon") 
   
  }


  getData(type) {
    console.log(type);
    
  return this.api2Service.getData(type)
  }
}
