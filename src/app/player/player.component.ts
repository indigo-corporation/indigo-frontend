import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Input } from '@angular/core'
import { Inject } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  public safeSrc: SafeResourceUrl;  
  constructor(private sanitizer: DomSanitizer,private router: Router
  ) { }

  ngOnInit() {
      if(this.film.shiki_id) {
        this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID="+this.film.shiki_id);
      } else {
        this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://64.svetacdn.in/XW3VQUDeE6yi?imdb_id="+this.film.imdb_id);
      }
    
      
      console.log(this.safeSrc);  
  }

  onPlayer(player) {
    let shId = this.film.shiki_id
    
    if(player ==='kodic' && shId) {
      debugger
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID="+shId);
      return
    }
    if(player==='cdn' && this.film.imdb_id) {
      debugger
      this.srcPlayer = this.sanitizer.bypassSecurityTrustResourceUrl("https://64.svetacdn.in/XW3VQUDeE6yi?imdb_id="+this.film.imdb_id);
    }
  
  }


}