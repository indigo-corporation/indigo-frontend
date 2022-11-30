import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import "@angular/common/locales/global/ru"
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { AuthPopup } from "../auth-popup/auth-popup.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit {
  public id: any
  term: any;
  totalRecords: string
  film: any
  login:any
  isTogther: boolean = true
  isFilm:boolean = true
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private auth: authService,
    private dialog: MatDialog,
    private meta:Meta,
    private title:Title) { 
      
    }
  ngOnInit() {
    

    this.id = this.route.snapshot.paramMap.get('id');
    this.getfind(this.id);
    this.auth.user$.subscribe(x => {
      this.login = x != null
      
    })
    
  }

  getfind(id) {
    this.api2Service.getfind(id).subscribe((data) => {
      this.film = data.data;
      let imdbID = this.film.imdb_id;
      console.log(this.film);
      this.title.setTitle(this.film.title)
      if (this.film.is_anime === true) {
        this.meta.addTag(
       
          { name: "description", content: this.film.title + this.film.original_title + "Аниме, Анимесериалы, Анимесериал, Смотреть Аниме онлайн, Аниме HD, совместный просмотр" })
      }

      if (this.film.is_serila === true) {
        this.meta.addTag(
       
          { name: "description", content: this.film.title + this.film.original_title + "Сериалы, сериал, Смотреть сериалы онлайн, сериалы HD, совместный просмотр" })
      }
     
    });
  }

  togetherOn(isTogther) {
    if(!this.login) {
      this.openLogin()
      return
    }
    this.isTogther = isTogther
    console.log(this.isTogther);
  }

  watchOn(change) {
    debugger
    this.isTogther = change
  }

  openLogin() {
    const dialogRef = this.dialog.open(AuthPopup);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
