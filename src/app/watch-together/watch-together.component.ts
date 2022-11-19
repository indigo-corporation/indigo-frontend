import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Input } from '@angular/core'
import { Router } from '@angular/router';
import { api2Service } from '../services/api2.service';
import { ActivatedRoute } from '@angular/router';
import { PlayerComponent } from "../player/player.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import "@angular/common/locales/global/ru"
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { authService } from "../services/authService.service";
import { AuthPopup } from "../auth-popup/auth-popup.component";

@Component({
  selector: 'app-watch-together',
  templateUrl: './watch-together.component.html',
  styleUrls: ['./watch-together.component.scss']
})
export class WatchTogetherComponent implements OnInit {
  term: any;
  totalRecords: any
  name: any
  log: any
  login:any
  film_id: number
  public safeSrc: SafeResourceUrl;
  @Input() film: any
  @Output() backWatch = new EventEmitter<boolean>();
  public id: any
  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private auth: authService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(x => {
      this.login = x != null
      
    })
    console.log(this.route.snapshot.paramMap);
    console.log(this.film);
    
  }

  ngAfterViewChecked() {
    if (this.film.is_anime) {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://kodik.cc/find-player?shikimoriID=" + this.film.shiki_id);
    } else {
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://64.svetacdn.in/XW3VQUDeE6yi?imdb_id=" + this.film.imdb_id);
    }
    console.log(this.film);
    
  }
  onChange(change:boolean) {
    debugger
    this.backWatch.next(change)
  }
}
