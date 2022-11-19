import { Component, OnInit } from '@angular/core';
import { messangerService } from 'src/app/services/messanger.service';


@Component({
  selector: 'app-block-contacts',
  templateUrl: './block-contacts.component.html',
  styleUrls: ['./block-contacts.component.scss']
})
export class BlockContactsComponent implements OnInit {
  isWrapper:boolean = false
  isBlock:boolean = true

  bannedUsers
  constructor(
    private messangerService:messangerService,
  ) { }

  ngOnInit() {
    this.getBannedUsers()
  }

  getBannedUsers() {
    this.messangerService.getBannedUsers().subscribe((data)=> {
      this.bannedUsers = data.data.items
      if(this.bannedUsers.length === 0) {
        this.isWrapper = true
        this.isBlock = false
      }
    })
  }

  
  unblockUser(userId) {
    this.messangerService.postBannedUserRemove(userId).subscribe((data)=> {
      this.bannedUsers = this.bannedUsers.filter(x => x.id != userId)
      if(this.bannedUsers.length === 0) {
        this.isWrapper = true
        this.isBlock = false
      }
    })
  }
}
