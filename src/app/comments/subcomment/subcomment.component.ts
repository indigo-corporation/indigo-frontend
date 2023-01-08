import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { authService } from "../../services/authService.service";
import { MatDialog } from "@angular/material/dialog";
import { AuthPopup } from "../../auth-popup/auth-popup.component";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcomment',
  templateUrl: './subcomment.component.html',
  styleUrls: ['./subcomment.component.scss']
})
export class SubcommentComponent implements OnInit {
  constructor(
    private api2Service: api2Service, 
    private auth: authService,
    private route:ActivatedRoute,
    private router:Router ,
    private dialog: MatDialog) { }
  @Output() subcommentPosted = new EventEmitter<any>();
  isShown: boolean;
  isCollapsed: boolean;
  user: any
  login: boolean = false
  comments: any
  @Input() comment: any
  @Input() filmId: any
  ngOnInit(): void {
    console.log(this.comment);
    this.auth.user$.subscribe(x => {
      this.user = x
      this.login = x != null
    })
    this.isShown = false;
    this.isCollapsed = false;
    console.log(this.comment);

  }

  onCommentPosted(comment) {
    console.log(this.comment);
    this.isShown = false;
    this.subcommentPosted.next(comment.comment)
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

  openDialog() {
    const dialogRef = this.dialog.open(AuthPopup);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

changeLike(type) {
  let prevType = this.comment.like ? this.comment.like.is_like : null

  if (prevType !== null && prevType == type) {
    this.postUnLike()
  } else {
    this.postLike(type)
  }

}


getComment() {
  this.api2Service.getComments(this.filmId, 1).subscribe((data) => {
    console.log(data);
    this.comments = data.data.items
  });
}

toggleShow() {
  this.isShown = !this.isShown;
}

OpenComments() {
  this.isCollapsed = !this.isCollapsed;
}

}
