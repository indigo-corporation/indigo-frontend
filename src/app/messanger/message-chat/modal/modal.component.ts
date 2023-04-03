import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { messangerService } from '../../../services/messanger.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  chat: any
  chats:any
  chatsFiltr:any
  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private messangerService: messangerService,
  ) {

  }

  ngOnInit() {
    this.getChats()
  }

  close(): void {
    this.modalRef.close(this.chat)
  }

  getChats() {
    this.messangerService.getChats().subscribe((data)=> {
      this.chats=data.data.items
    })
  }

  deleteChat() {
    let chatId = this.chat
    this.messangerService.deleteChat(chatId).subscribe((data) => {

      this.close()
    })
  }
}
