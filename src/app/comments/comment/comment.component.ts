import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { authService } from "../../services/authService.service";
import { AuthPopup } from "../../auth-popup/auth-popup.component";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  isShown: boolean;
  isCollapsed: boolean;
  isNullCom: boolean;
  public textArea: string
  login: boolean = false
  user: any
  comments: any;
  @Output() likeSubmitted = new EventEmitter<any>();
  @Input() filmId: any
  @Input() comment: any
  constructor(
    private api2Service: api2Service,
    private auth: authService,
    private route:ActivatedRoute,
    private router:Router ,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isShown = false;
    this.isCollapsed = false;
    console.log(this.comment);
    this.auth.user$.subscribe(x => {
      this.login = x != null

    })
  }
  postLike(is_like) {
    if(this.login) {
      this.api2Service.postLike(this.comment.id, is_like).subscribe((data) => {
        if (data.state == true) {
           this.comment.like = data.data.like
           this.comment.likes_count = data.data.likes_count
           this.comment.dislikes_count = data.data.dislikes_count
         } 
       });
    } else {
      this.openDialog()
    }
  }
  postUnLike() {
    if(this.login) {
      this.api2Service.postUnLike(this.comment.id).subscribe((data) => {
        if (data.state == true) {
          this.comment.like = data.data.like
          this.comment.likes_count = data.data.likes_count
          this.comment.dislikes_count = data.data.dislikes_count
        } 
      });
    } else {
      this.openDialog()
    }
  }

  onLogin() {
    if(this.login) {
      this.router.navigate(["/user-page/" + this.comment.user.id])
    } else {
      this.openDialog()
    }
  }



  changeLike(type) {
    let prevType = this.comment.like ? this.comment.like.is_like: null
    
    if (prevType !== null && prevType == type) {
      this.postUnLike()
    } else {
      this.postLike(type)
     }

  }

  onCommentPosted(comment) {
    console.log('onCommentPosted', comment);
    this.comment.answers.push(comment.comment)
    console.log(this.comment);
    this.isShown = false;
  }

  onSubCommentPosted(comment) {
    console.log(this.comment);
    this.textArea = this.comment.user.name
    this.comment.answers.push(comment)
  }

  getComment() {
    this.api2Service.getComments(this.filmId, 1).subscribe((data) => {
      console.log(data);
      this.comments = data.data.items
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthPopup);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }

  OpenComments() {
    this.isCollapsed = !this.isCollapsed;
  }

}
