import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from "@angular/material/form-field";
import { authService } from '../services/authService.service';
import { AlertifyService } from '../services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})

export class AuthPopup implements OnInit {
  hidediv: boolean = true
  login: boolean = true

  isLoad: boolean = false;
  isLoadError: boolean = false;
  data = "";
  botName = "IndigoFilmsBot";
  user: any
  loggedIn: any
  constructor(
    private formBuilder: FormBuilder,
    private matFormFieldModule: MatFormFieldModule,
    private snackBar: MatSnackBar,
    private authService: SocialAuthService,
    private auth: authService,
    private alertify: AlertifyService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AuthPopup>) {

    /*  GoogleService.userProfileSubject.subscribe(info => {
       this.userInfo = info
       console.log(this.userInfo);
 
     }) */
  }

  ngOnInit() {
   this.loginWithGoogle()
  }

 
  loginWithGoogle() {
    this.authService.authState.subscribe((user) => {
      this.user = user
      this.loggedIn = (user != null)
      let data = {
        data: user
      }
      console.log(data);
      
      debugger
      this.auth.authGoogle(data).subscribe((data) => {
        let token = data["data"]["access_token"]
        if (token) {
          localStorage.setItem("token", token);
          this.alertify.success('Вход успешный');
          this.dialogRef.close()
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
    console.log(user)
    let data = {
      data: user
    }
    this.auth.authTelegram(data).subscribe((data) => {
      let token = data["data"]["access_token"]
      if (token) {
        localStorage.setItem("token", token);
        this.alertify.success('Вход успешный');
        this.dialogRef.close()
        this.auth.getUser()
      }
    })
    debugger
  }

  closeDialog() {
    this.dialogRef.close();
  }
}