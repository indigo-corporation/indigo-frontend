import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from "../services/authService.service";
import { ActivatedRoute } from '@angular/router';
import { AuthPopup } from "../auth-popup/auth-popup.component";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public textArea: string = '';
  isShown: boolean;
  public id: any
  comments: any;
  count: number;
  like:any
  body
  totalPages
  totalRecords: string
  page: number
  login: boolean = false
  public isEmojiPickerVisible: boolean;
  @Input() filmId: any
  @Input() comment: any

  constructor(
    private api2Service: api2Service,
    private router: Router,
    private route: ActivatedRoute,
    private auth: authService,
    private dialog: MatDialog) {
     }

  ngOnInit() {
    this.page=this.route.snapshot.queryParams.page
      if(!this.page) {
        this.page = 1 
      }
    console.log(this.filmId);
    this.getComment()
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.login = x != null
      console.log(this.login);
    })
    
  }

  genContent(): void {
    debugger
    if(this.page < this.totalPages) {
      this.page++
      this.getCommentInfinity()
    }
  }

  onCommentPosted(comment) {
    console.log('onCommentPosted',comment);
    this.comment = comment.comment
    this.comments.push(this.comment)
    this.getComment()
    console.log(this.comment);
  }

  onlikePosted(comment) {
    this.comment = comment.like
    console.log(this.comment);
  }
  

  getComment() {
    this.api2Service.getComments(this.filmId, this.page).subscribe((data) => {
      console.log(data);
      this.comments = data.data.items
      this.totalRecords = data.data.pagination.total
      this.totalPages = data.data.pagination.total_pages
    });
  }

  
  getCommentInfinity() {
    this.api2Service.getComments(this.filmId, this.page).subscribe((data) => {
     this.comments=this.comments.concat(data.data.items)
      console.log(this.comments);
    });
  }
  
  

  openDialog() {
    const dialogRef = this.dialog.open(AuthPopup);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

