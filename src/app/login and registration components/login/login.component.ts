import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { authService } from "../../services/authService.service";
import { MatDialogRef} from "@angular/material/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import  * as alertyfy from 'alertifyjs';
import { api2Service } from '../../services/api2.service';
import { AlertifyService } from '../../services/alertify.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalLoginComponent } from 'src/app/modal-login/modal-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hidediv:boolean=true
favoriteFilmIds
loginForm = new FormGroup ({
  email: new FormControl ("",[Validators.required,Validators.email]),
  password: new FormControl ("",[Validators.required,Validators.minLength(6)])
})
constructor(
  private router: Router,
  private route: ActivatedRoute,
  private auth: authService,
  private api2Service: api2Service,
  private ReactiveFormsModule:ReactiveFormsModule,
  private alertify:AlertifyService,
  public modalRef: MdbModalRef<ModalLoginComponent>,) 

  {

  }

  ngOnInit() {
    
  }
  close(): void {
    this.modalRef.close()
  }

  get password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }
  get email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }


    logIn() {
      this.auth.logInUser(this.loginForm.value).subscribe((result)=>{
       let token = result["data"]["access_token"]
       if (token) {
        localStorage.setItem("token",token);
        this.alertify.success('Вход успешный');
        this.auth.getUser() 
        this.router.navigate(['user-page']);
        this.close() 
        const currentRoute = this.router.url;
        if (currentRoute === '/reg') {
           this.router.navigate(['user-page']);
        } 
       } 
      },() => {
      this.alertify.error("Неправильный пароль или email");
    },)
  }
}