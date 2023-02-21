import { Component, OnInit } from '@angular/core';
import { api2Service } from '../services/api2.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from "../services/authService.service";
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLoginComponent } from 'src/app/modal-login/modal-login.component';
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
  like: any
  body
  totalPages
  totalRecords: number
  page: number
  login: boolean = false
  public isEmojiPickerVisible: boolean;
  @Input() filmId: any
  @Input() comment: any
  modalRef: MdbModalRef<ModalLoginComponent> | null = null;

  constructor(
    private api2Service: api2Service,
    private modalService: MdbModalService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: authService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.page = this.route.snapshot.queryParams.page
    if (!this.page) {
      this.page = 1
    }
    this.getComment()
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.login = x != null
    })

  }

  genContent(): void {
    if (this.page < this.totalPages) {
      this.page++
      this.getCommentInfinity()
    }
  }

  onCommentPosted(comment) {
    this.comment = comment.comment
    this.comments.push(this.comment)
    this.getComment()
  }

  onlikePosted(comment) {
    this.comment = comment.like
  }


  getComment() {
    this.api2Service.getComments(this.filmId, this.page).subscribe((data) => {
      this.comments = data.data.items
      this.totalRecords = data.data.pagination.total
      this.totalPages = data.data.pagination.total_pages
    });
  }


  getCommentInfinity() {
    this.api2Service.getComments(this.filmId, this.page).subscribe((data) => {
      this.comments = this.comments.concat(data.data.items)
    });
  }



  openDialog() {
    this.modalRef = this.modalService.open(ModalLoginComponent, {
    });
    this.modalRef.onClose.subscribe((data: any) => {

    });
  }
}

