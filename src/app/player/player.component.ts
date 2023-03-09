import { Component, OnInit,Output,EventEmitter } from '@angular/core';
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
import { trigger, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
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
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() film: any
  @Output() filmPost = new EventEmitter<string>();
  imdb_id
  isPlayerKodic: boolean = true
  isPlayerSveta: boolean = false
  srcPlayer: any
  asvPlayer
  isHiddenKodic:boolean = false
  isHiddenUa:boolean = false
  data

  ashdiUrl :string
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
     let ashdiUrl = 'https://base.ashdi.vip/api/product/read_one.php?imdb='+this.film.imdb_id +'&api_key=99a660-8378e4-4adb0a-eeeb92-86b677';
    this.http.get<any>(ashdiUrl).subscribe(
      data => this.ashdiUrl = data.url,
      err => this.isHiddenUa = true,
    ); 

    
   
    if(this.film.shiki_id) {
    
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID="+this.film.shiki_id);
    } else {
      let kodiciUrl = "https://kodikapi.com/search?token=c93d194dd1a2f6cc95b3095a9940dfb2&imdb_id="+this.film.imdb_id;
      this.http.get<any>(kodiciUrl).subscribe((data) => {
        if(!data.total) {
          this.isHiddenKodic = true
        }
      });
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id="+this.film.imdb_id+"&domain=indigofilms.online");
    }
  }
  onPlayer(player: string) {
    let shId = this.film.shiki_id
    this.currentPlayer = player;
    if (player === 'kodic' && this.film.shiki_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID=" + this.film.shiki_id);
    } else {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?imdbID=" + this.film.imdb_id);
    }

    if (player === 'cdn' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id=" + this.film.imdb_id);
    }
    
    if (player === 'ASHDI' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl(this.ashdiUrl)
    }
  }
}