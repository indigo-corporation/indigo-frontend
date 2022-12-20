import { Component, OnInit } from '@angular/core';
import { authService } from "../services/authService.service";
import { Router, ActivatedRoute } from '@angular/router';
import { messangerService } from '../services/messanger.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  login: boolean = false
  user:any
  constructor(
    private auth: authService,
    private messangerService: messangerService,
    private router: Router
  ) { }

  ngOnInit () {
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.login = x != null
      this.user = x
      console.log(this.login);
    })
  }

  onSupport() {
    this.router.navigate(["support/"])
   /*  if(this.user) {
      let supportId = 36
      this.messangerService.getChatByUser(supportId).subscribe((data) => {
        let chat = data.data
        this.router.navigate(["message/" + chat.id])
      })
    } else {
      this.router.navigate(["support/"])
    } */
  }

}
