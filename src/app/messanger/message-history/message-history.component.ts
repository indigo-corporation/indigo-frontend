import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { EverythingServiceService } from 'src/app/everything-service.service';
import { authService } from '../../services/authService.service';
import { messangerService } from '../../services/messanger.service'
@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.scss']
})
export class MessageHistoryComponent implements OnInit {
  chatUsers:any
  @Input() chat: any
  @Output() messageSub = new EventEmitter<any>();
  myUser:any
  textArea
  isBlock:boolean = false
  message:any
  messages:any
  constructor(
    private readonly EverythingServiceService:EverythingServiceService ,
    private auth: authService,
    private messangerService:messangerService,
  ) { 
 /*    this.EverythingServiceService.onClick.subscribe((cnt) => this.chatUsers = cnt); */
  }

  ngOnInit() {
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.myUser = x
    })
    this.getChat()
    if(!this.chat.id) {
      console.log(this.chat);
    }
  }

  deleteMessage(value) {
    let messageId = value
    this.messangerService.deleteMessage(messageId).subscribe((data)=>{
     this.messages = this.chat.messages.filter(x => x.id != messageId)
      this.chat.messages=this.messages 
      console.log(this.chat);
    })
  } 

  getChat() {
    this.messangerService.getChat(this.chat.id).subscribe((data)=> {
      this.chat=data
    })
  }

  blockUser(userId) {
    debugger
    this.messangerService.postBannedUseradd(userId).subscribe((data)=> {
      this.isBlock = true
    })
  }

  unBlockUser(userId) {
    debugger
    this.messangerService.postBannedUseradd(userId).subscribe((data)=> {
      this.isBlock = false
    })
  }
  


  onPostMessage() {
    console.log(this.message); 
    this.messangerService.postMessage(this.chat.id, this.textArea).subscribe((data)=> {
      this.message=data.data
      this.messages = this.chat.messages
      this.messages.push(this.message)
      this.textArea = ""
    })
  }
}
