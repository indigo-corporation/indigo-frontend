import { Component, ErrorHandler, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { api } from '../services/api.service';
import { api2Service } from '../services/api2.service';
import { messangerService } from '../services/messanger.service';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { authService } from '../services/authService.service';
import { HttpClient } from "@angular/common/http";
import * as e from 'express';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  term: any;
  totalRecords: any
  isMyUser: boolean = true
  isContact: boolean = false
  isBlock: boolean = false
  isWaiting: boolean = false
  page: number = 1
  name: any
  log: any
  card: any
  user: any
  film: any
  contactIds: any
  currentUser: any
  favoriteFilmIds: any
  data: any
  public id: any
  outComes: any
  constructor(private apiService: api,
    private api2Service: api2Service,
    private messangerService: messangerService,
    private auth: authService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatInputModule,
    private http: HttpClient,
    private meta: Meta,
    private title: Title) {

  }
  ngOnInit() {
    this.title.setTitle("Профиль")
    this.auth.user$.subscribe(x => {
      this.user = x
    })
    let userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.localStorageOutComes(userId)
      this.getIsContact(userId)
      this.userGet(userId)
    }

  }

  localStorageOutComes(userId) {
    let outComes = localStorage.getItem("outComes")
    if (outComes) {
      this.outComes = JSON.parse(outComes)
      if (this.outComes.filter(x => x.user.id == userId)) {
        this.isWaiting = true
      }
    }
  }

  updatingUserInfo(userInfo) {
    this.user = userInfo
  }

  getIsContact(userId) {
    let contactIds: any = localStorage.getItem("contactIds")
    if (contactIds) {
      this.contactIds = JSON.parse(contactIds)
      if (userId) {
        if (this.contactIds.includes(userId)) {
          this.isContact = true
        }
      }
    } else {
      this.messangerService.getContactsArray().subscribe((data) => {
        this.contactIds = data.data
        if (this.contactIds) {
          localStorage.setItem("contactIds", JSON.stringify(this.contactIds))
        }
        if (userId) {
          if (this.contactIds.includes(userId)) {
            this.isContact = true
          }
        }
      })
    }
  }

  notWaiting(userId) {
    let outComes = localStorage.getItem("outComes")
    if (outComes) {
      this.outComes = JSON.parse(outComes)
      this.outComes = this.outComes.filter(x => x.user.id == userId)
      if (this.outComes.length) {
        let request = this.outComes[0]
        this.messangerService.destroyRequest(request.id).subscribe((data) => {
          localStorage.removeItem("outComes")
          this.isWaiting = !this.isWaiting
        })

      }
    } else {
      this.messangerService.getOutComes().subscribe((data) => {
        this.outComes = data.data.items
        localStorage.setItem("outComes", JSON.stringify(this.outComes))
        this.outComes = this.outComes.filter(x => x.user.id == userId)
        if (this.outComes.length) {
          let request = this.outComes[0]
          this.messangerService.destroyRequest(request.id).subscribe((data) => {
            localStorage.removeItem("outComes")
            this.isWaiting = !this.isWaiting
          })
        }
      })
    }
  }

  AddContact() {
    let userId = this.route.snapshot.paramMap.get('id');
    this.messangerService.addContact(userId).subscribe((data) => {
      /* localStorage.removeItem("outComes") */
      let contactIds: any = localStorage.getItem("contactIds")
      contactIds = JSON.parse(contactIds)
      contactIds.push(this.user.id)
      if(this.user.id) {
        this.isContact = true
      }

      debugger
      localStorage.setItem("contactIds", JSON.stringify(this.contactIds))
    })
  }


  removeContact() {
    let userId = this.route.snapshot.paramMap.get('id');
    this.messangerService.removeContact(userId).subscribe((data) => {
      this.contactIds = this.contactIds.filter(function (value, index, arr) {
        return value != userId
      })
      this.isContact = false
      localStorage.setItem("contactIds", JSON.stringify(this.contactIds))
    })
  }

  blockUser(userId) {
    debugger
    this.messangerService.postBannedUseradd(userId).subscribe((data) => {
      this.isBlock = true
    })
  }

  unBlockUser(userId) {
    debugger
    this.messangerService.postBannedUseradd(userId).subscribe((data) => {
      this.isBlock = false
    })
  }



  OnChat() {
    this.messangerService.getChatByUser(this.route.snapshot.paramMap.get('id')).subscribe((data) => {
      let chat = data.data
      this.router.navigate(["message/" + chat.id])
    })
  }

  userGet(user_id) {
    this.api2Service.userGet(user_id).subscribe((data) => {
      let myUser = this.user
      this.user = data.data
      this.isMyUser = myUser.id == this.user.id
      console.log(myUser, this.user);
    });
  }

  getfind(id) {
    this.api2Service.getfind(id).subscribe((data) => {
      this.film = data;
      console.log(this.film);
      let imdbID = this.film.imdb_id;
      console.log(imdbID);
    });
  }

  getData(page) {
    this.api2Service.getData(page).subscribe((data) => {
      console.log(data);
      this.data = data
      this.totalRecords = data.data.items
    });
  }
}
