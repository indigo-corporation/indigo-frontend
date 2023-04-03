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

  }

  ngOnInit() {
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.myUser = x
    })
  }

  deleteMessage(value) {
    let messageId = value
    this.messangerService.deleteMessage(messageId).subscribe((data)=>{
     this.messages = this.chat.messages.filter(x => x.id != messageId)
      this.chat.messages=this.messages 
    })
  } 



  blockUser(userId) {
    this.messangerService.postBannedUseradd(userId).subscribe((data)=> {
      this.isBlock = true
    })
  }

  unBlockUser(userId) {
    this.messangerService.postBannedUserRemove(userId).subscribe((data)=> {
      this.isBlock = false
    })
  }
  


  onPostMessage() {
    this.messangerService.postMessage(this.chat.id, this.textArea).subscribe((data)=> {
      this.message=data.data
      this.messages = this.chat.messages
      this.messages.push(this.message)
      this.textArea = ""
    })
  }
}
