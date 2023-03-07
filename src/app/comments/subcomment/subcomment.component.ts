import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { authService } from "../../services/authService.service";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLoginComponent } from 'src/app/modal-login/modal-login.component';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-subcomment',
  templateUrl: './subcomment.component.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ height: '0', opacity: '0'}),
        animate('400ms ease-in-out', style({ height: '*', opacity: '1'}))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('400ms ease-in-out', style({ height: '0', opacity: '0'}))
      ])
    ]
    )
  ],
  styleUrls: ['./subcomment.component.scss']
})
export class SubcommentComponent implements OnInit {
  @Output() subcommentPosted = new EventEmitter<any>();
  isShown: boolean;
  isCollapsed: boolean;
  user: any
  login: boolean = false
  comments: any
  @Input() comment: any
  @Input() filmId: any
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;

  constructor(
    private api2Service: api2Service,
    private modalService: MdbModalService,
    private auth: authService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.auth.user$.subscribe(x => {
      this.user = x
      this.login = x != null
    })
    this.isShown = false;
    this.isCollapsed = false;
  }

  onCommentPosted(comment) {
    this.isShown = false;
    this.subcommentPosted.next(comment.comment)
  }


  postLike(is_like) {
    if (this.login) {
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
    if (this.login) {
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
    if (this.login) {
      this.router.navigate(["/user-page/" + this.comment.user.id])
    } else {
      this.openDialog()
    }
  }

  openDialog() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {
 
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
