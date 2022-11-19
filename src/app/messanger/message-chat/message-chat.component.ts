import { Component, OnInit, Output, EventEmitter, Input, HostListener, AfterViewInit } from '@angular/core';
import { messangerService } from '../../services/messanger.service'
import { ActivatedRoute, Router } from '@angular/router';
import { authService } from '../../services/authService.service';
import { EverythingServiceService } from 'src/app/everything-service.service';
import { Location } from '@angular/common';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from './modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.scss']
})
export class MessageChatComponent implements OnInit {
  modalRef: MdbModalRef<ModalComponent> | null = null;
  chat: any
  myUser: any
  chatId: number
  id: any
  chatUsers
  totalRecords: number
  page: number
  currentPage: number
  totalPages: number
  data: any
  @Output() onUsers = new EventEmitter<any>();
  @Output() onChat = new EventEmitter<any>();
  @Input() chats: any




  @Output() onUserChatCreate = new EventEmitter<any>();
  constructor(
    private modalService: MdbModalService,
    private dialog: MatDialog,
    private messangerService: messangerService,
    private route: ActivatedRoute,
    private auth: authService,
    private router: Router,
    private location: Location,
    private readonly EverythingServiceService: EverythingServiceService
  ) {

  }

  ngOnInit() {
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.myUser = x
    })
    this.getChats()
    this.chatId = Number(this.route.snapshot.paramMap.get('id'))
    if (this.chatId) {
      this.onUserChatCreate.next(this.chatId)
    }
    console.log(this.chatId);
  }

  onScroll() {
    console.log("scrolled down!!");
    debugger
    if(this.page < this.totalPages) {
      this.page++
      this.getChatsInfinity()
      debugger
    }
    // add another 20 items
    
  }


  getChat(id) {
    this.messangerService.getChat(id).subscribe((data) => {
      this.chat = data.data
    })
  }

  onUserChat($event) {
    let chatId = $event
    console.log($event);
    this.location.replaceState("/message/" + chatId);
    this.onUsers.next($event);
  }

  getChats() {
    this.messangerService.getChats(this.page).subscribe((data) => {
      this.chats = data.data.items
      this.totalRecords = data.data.pagination.total
      this.totalPages = data.data.pagination.total_pages
      this.currentPage = data.data.pagination.current_page
      this.page = this.currentPage
      debugger
    })
  }

  getChatsInfinity() {
    this.messangerService.getChats(this.page).subscribe((data) => {
      this.chats = this.chats.concat(data.data.items)
      console.log(this.chats);
      debugger
    })
  }

  openModal($event) {
    console.log($event);
    debugger
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { chat: $event },
    });
    this.modalRef.onClose.subscribe((data: any) => {
      if (data != null) {
        this.chats = this.chats.filter(x => x.id != data)
        this.chat = false
        this.onChat.next(this.chat)
      }
      console.log(data);
      debugger
    });
  }
}