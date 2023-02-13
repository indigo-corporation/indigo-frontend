import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { authService } from '../services/authService.service';
import { AlertifyService } from '../services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent implements OnInit {
  hidediv: boolean = true
  login: boolean = true

  isLoad: boolean = false;
  isLoadError: boolean = false;
  data = "";
  botName = "IndigoFilmsBot";
  user: any
  loggedIn: any
  constructor(
    private modalService: MdbModalService,
    private authService: SocialAuthService,
    private auth: authService,
    private alertify: AlertifyService,
    public modalRef: MdbModalRef<ModalLoginComponent>,
  ) { }

  ngOnInit() {
    this.loginWithGoogle()
  }

  close(): void {
    this.modalRef.close()
  }

  loginWithGoogle() {
    this.authService.authState.subscribe((user) => {
      this.user = user
      this.loggedIn = (user != null)
      let data = {
        data: user
      }
      this.auth.authGoogle(data).subscribe((data) => {
        let token = data["data"]["access_token"]
        if (token) {
          localStorage.setItem("token", token);
          this.alertify.success('Вход успешный');
          this.close()
          this.auth.getUser()
        }
      })
    })
  }

  onLoad() {
    this.isLoad = true;
  }



  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    let data = {
      data: user
    }
    this.auth.authTelegram(data).subscribe((data) => {
      let token = data["data"]["access_token"]
      if (token) {
        localStorage.setItem("token", token);
        this.alertify.success('Вход успешный');
        this.close()
        this.auth.getUser()
      }
    })
  }

}
