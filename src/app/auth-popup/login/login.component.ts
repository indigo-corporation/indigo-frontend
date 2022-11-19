import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { authService } from "../../services/authService.service";
import { MatDialogRef} from "@angular/material/dialog";
import { AuthPopup } from "../auth-popup.component"
import { ReactiveFormsModule } from '@angular/forms';
import  * as alertyfy from 'alertifyjs';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hidediv:boolean=true
loginForm = new FormGroup ({
  email: new FormControl ("",[Validators.required,Validators.email]),
  password: new FormControl ("",[Validators.required,Validators.minLength(6)])
})
constructor(
  private router: Router,
  private route: ActivatedRoute,
  private auth: authService,
  private ReactiveFormsModule:ReactiveFormsModule,
  private alertify:AlertifyService,
  public dialogRef: MatDialogRef<AuthPopup>) 

  {

  }

  ngOnInit() {
    
  }
  closeDialog() {
    this.dialogRef.close();
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
        this.dialogRef.close()
        this.auth.getUser()  
       } 
      },() => {
      this.alertify.error("Неправильный пороль или email");
    },)
  }
}