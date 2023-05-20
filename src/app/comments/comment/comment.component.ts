import { Component, OnInit, Output,EventEmitter,ChangeDetectorRef } from '@angular/core';
import { api2Service } from '../../services/api2.service';
import { Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { authService } from "../../services/authService.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLoginComponent } from 'src/app/modal-login/modal-login.component';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ height: '0', opacity: '0', overflow: 'hidden' }),
        animate('400ms ease-in-out', style({ height: '*', opacity: '1', overflow: 'hidden' }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('400ms ease-in-out', style({ height: '0', opacity: '0', overflow: 'hidden' }))
      ])
    ]),
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
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  isShown: boolean = false
  isCollapsed: boolean = true
  isNullCom: boolean;
  public textArea: string
  login: boolean = false
  user: any
  textView: boolean = false
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;
  comments: any;
  @Output() likeSubmitted = new EventEmitter<any>();
  @Input() filmId: any
  @Input() comment: any
  userAvatar:any
  constructor(
    private cdRef: ChangeDetectorRef,
    private api2Service: api2Service,
    private auth: authService,
    private route:ActivatedRoute,
    private modalService: MdbModalService,
    private router:Router ,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isShown = false;
    this.isCollapsed = false;
    this.auth.user$.subscribe(x => {

      if(x) {
        this.user = x
        this.userAvatar = x.poster_small + "?d="+Date.now()
        this.cdRef.detectChanges(); 
      }
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

  
  openCloseText() {
    this.textView = !this.textView
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
    this.comment.answers.push(comment.comment)
    this.isShown = false;
  }

  onSubCommentPosted(comment) {
    this.textArea = this.comment.user.name
    this.comment.answers.push(comment)
  }

getAvatar(comment) {  
  let commentUserId = comment.user.id
  if (commentUserId === this.user?.id) {
    
    return this.user.poster_small
    
  }
  return comment.user.poster_small

}

  getComment() {
    this.api2Service.getComments(this.filmId, 1).subscribe((data) => {
      this.comments = data.data.items
    });
  }

  openDialog() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {
 
    });
  }

  toggleShow() {
    this.isShown = !this.isShown;
    this.isCollapsed = false;
  }

  OpenComments() {
    this.isCollapsed = !this.isCollapsed;
  }

}
