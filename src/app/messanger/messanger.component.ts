import { Component, OnInit,Input } from '@angular/core';
import { messangerService } from '../services/messanger.service';
import { ActivatedRoute,Router, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.scss']
})
export class MessangerComponent implements OnInit {
  UserId:any
  isContact: boolean = false;
  isChat: boolean = true;
  isIncome: boolean = false;
  isOutcome: boolean = false;
  isBlock: boolean = false;
  chatUsers:any
  contacts:any
  chat:any
  message:any
  inComes:any
  outComes
  outComesId:number
  chats:any
  totalRecords:number
  page: number
  totalPages : number
  constructor(
    private messangerService:messangerService,
    private route:ActivatedRoute,
    private router: Router,
    private location: Location,

  ) { 
  }

  ngOnInit() {
    let chatId =this.route.snapshot.paramMap.get('id')
    if(chatId) {
      this.getChat(chatId)
    }
    if(this.route.snapshot['_routerState'].url === "/friends") {
      this.isContact=true
      this.isChat=false
    } 
    if(this.route.snapshot['_routerState'].url === "/message") {
      this.isContact=false
      this.isChat=true
    } 
  }



  getAcceptedUserId(contactId) {
    this.contacts.push(contactId)
  }


  getOutComesId(outComesId) {
    this.outComesId = outComesId
  }

 
  getContacts() {
    this.messangerService.getContacts().subscribe((data)=> {
      this.contacts = data.data.items
    })
  }


  chatNull($event) {
    this.chat = $event
  }

  chatCreate($event) {
    this.chat = $event
  }

  getChatByUser(user_id) {
    this.messangerService.getChatByUser(user_id).subscribe((data)=> {
      this.chat = data.data
    })
  }

  getChat(id) {
    this.messangerService.getChat(id).subscribe((data)=> {
      this.chat = data.data
    })
  }

  onUsersSub(value) {
    this.getChat(value) 
  }

  onNavigateSecMenu($event) {
    /* let elm = $($event.target)
    if (!elm.hasClass("name-menu")) {
      elm = elm.find(".name-menu")
    }
    let navId
    navId = elm.attr("id")
    if (navId == "secnav1") {
      if(this.isIncome=true) {
        this.isBlock=false
        this.isOutcome=false
      }
    }
    if (navId == "secnav2") {
      if( this.isOutcome=true) {
        this.isIncome=false
        this.isBlock=false
      }
    }

    if (navId == "secnav3") {
      if(this.isBlock=true) {
        this.isOutcome=false
        this.isIncome=false
      }
    } */
  }


  onNavigate($event) {
  /*   let elm = $($event.target)
    if (!elm.hasClass("name-menu")) {
      elm = elm.find(".name-menu")
    }
    let navId
    navId = elm.attr("id")
    if (navId == "nav1") {
      if(this.isChat=true) {
        this.location.replaceState("message");
        this.isChat=true
        this.isContact=false
      }
    } else 
    {
      if(this.isContact=true) {
        this.location.replaceState("friends");
        this.isChat=false
        this.isContact=true
      }
     
    } */
  }
}