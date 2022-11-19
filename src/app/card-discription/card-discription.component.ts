import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import "@angular/common/locales/global/ru"
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { AuthPopup } from "../auth-popup/auth-popup.component";

@Component({
  selector: 'app-card-discription',
  templateUrl: './card-discription.component.html',
  styleUrls: ['./card-discription.component.scss']
})
export class CardDiscriptionComponent implements AfterViewInit, OnInit {
  term: any;
  totalRecords: any
  isFavorite: boolean = false
  name: any
  favorite: []
  log: any

  favoriteFilmIds:any
  login: any
  film_id: number
  public safeSrc: SafeResourceUrl;
  @Input() film: any
  @Output() isWatchSub = new EventEmitter<boolean>();
  public id: any
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private auth: authService,
    private dialog: MatDialog) {

  }
  ngOnInit() {
    this.auth.user$.subscribe(x => {
      this.login = x != null
    })
    if(this.login) {
      this.getFavoriteArray()
    }
}



  ngAfterViewInit() {
    if (this.film.is_anime) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID=" + this.film.shiki_id);
    } else {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://64.svetacdn.in/XW3VQUDeE6yi?imdb_id=" + this.film.imdb_id);
    }
     if (this.login) {
      if(this.favoriteFilmIds.includes(this.film.id)) {
        this.isFavorite = true
      }
    } 
  }

  getFavoriteArray() {
    this.api2Service.getFavoriteArray().subscribe((data) => {
      this.favoriteFilmIds = data.data
    })
  }
/* 
    let favoriteFilmIds: any = localStorage.getItem("favoriteFilmIds")
     if (favoriteFilmIds) {
       favoriteFilmIds = JSON.parse(favoriteFilmIds)
       return favoriteFilmIds
     } else { 
     this.api2Service.getFavoriteArray().subscribe((data) => {
      this.favoriteFilmIds = data.data
      debugger
       localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds))
      return favoriteFilmIds 
      }) 
    }) */

  postFavorite() {
    if (!this.login) {
      this.openLogin()
      return
    }
    this.api2Service.postFavorite(this.film.id).subscribe((data) => {
      this.favoriteFilmIds.push(this.film.id)
      this.isFavorite = true
      /* localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds)) */
    })
  }

  openLogin() {
    const dialogRef = this.dialog.open(AuthPopup);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  change(change: boolean) {
    console.log(change);

    this.isWatchSub.next(change)
  }

  removeFavorite() {
    this.api2Service.removeFavorite(this.film.id).subscribe((data) => {
      if(this.favoriteFilmIds = this.favoriteFilmIds.filter(x => x.id != this.film.id)) {
        this.isFavorite = false
      } 
      /*  localStorage.setItem("favoriteFilmIds", JSON.stringify(favoriteFilmIds)) */
    })
  }
}
