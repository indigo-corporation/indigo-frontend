import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Input } from '@angular/core'
import { Inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { api } from '../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() film: any
  imdb_id
  isPlayerKodic: boolean = true
  isPlayerSveta: boolean = false
  srcPlayer: any
  asvPlayer
  data
  active1: boolean = true
  active2: boolean = true
  active3: boolean = true
  currentPlayer: string = '';
  public safeSrc: SafeResourceUrl;
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
    private api: api
  ) { }

  ngOnInit() {
    if(this.film.shiki_id) {
      let shId = this.film.shiki_id
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID="+shId);
    }
    this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id="+this.film.imdb_id);
  }
<<<<<<< HEAD

  private readonly corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'; // адрес CORS Proxy

=======
>>>>>>> 2d3f50a6344a7ddbe14d6a7279f40ca8155c090a

  onPlayer(player: string) {
    let shId = this.film.shiki_id
    this.currentPlayer = player;

    if (player === 'kodic' && shId) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID=" + shId);
      return
    }
    if (player === 'cdn' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id=" + this.film.imdb_id);
    }
<<<<<<< HEAD
  /*   if (player === 'ASHDI' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl(this.asvPlayer)
    } */
=======
    /*  if(player ==='ASHDI' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl(this.asvPlayer)
    }  */
>>>>>>> 2d3f50a6344a7ddbe14d6a7279f40ca8155c090a
  }
}