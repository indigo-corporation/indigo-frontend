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


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() film: any
  imdb_id
  isPlayerKodic:boolean=true
  isPlayerSveta:boolean=false
  srcPlayer:any
  asvPlayer
  data
  active1 :boolean=true
  active2 :boolean=true
  active3 :boolean=true
  currentPlayer: string = '';
  public safeSrc: SafeResourceUrl;  
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private api:api
  ) { }

  ngOnInit() {
    fetch('https://base.ashdi.vip/api/product/read_one.php?imdb=tt6341832&api_key=99a660-8378e4-4adb0a-eeeb92-86b677')
      .then(response => response.json())
      .then(data => {
        this.data = data;
      })
      .catch(error => console.error(error));
  }

  ashvid() {
    this.api.getAshvid(this.film.imdb_id).subscribe((data) => {
      this.asvPlayer = data.url
      console.log(this.asvPlayer);
      
      debugger
    })
  }

  onPlayer(player: string) {
    let shId = this.film.shiki_id
    this.currentPlayer = player;
 
    if(player ==='kodic' && shId) {
        this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID="+shId);
      return
    }
    if(player ==='cdn' && this.film.imdb_id) {
        this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://12.svetacdn.in/vDqR81AxhrhI?imdb_id="+this.film.imdb_id);
    }
     if(player ==='ASHDI' && this.film.imdb_id) {
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl(this.asvPlayer)
    } 
  }
}