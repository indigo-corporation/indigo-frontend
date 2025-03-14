import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl, Validators, FormBuilder } from "@angular/forms"
import { authService } from "../../services/authService.service"
import { MatDialog, MatDialogRef} from "@angular/material/dialog";
import { ReactiveFormsModule } from '@angular/forms';
import  * as alertyfy from 'alertifyjs';
import { AlertifyService } from '../../services/alertify.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
  export class RegisterComponent implements OnInit {
    authForm: FormGroup
    alert:boolean=false
    submitted:boolean=false
    repeatPass:string = 'none';
    user
    @Input() telegramAuth:any
  constructor(
    private auth:authService,
    private router: Router, 
    private route: ActivatedRoute,
    private FormBuilder:FormBuilder,
    private ReactiveFormsModule:ReactiveFormsModule,
    private alertify:AlertifyService,
    private meta: Meta,
    private title: Title ) 
    {
        this.authForm = this.FormBuilder.group ({
            email: new FormControl("",[Validators.required,Validators.email]),
            name: new FormControl ("",[Validators.required,Validators.minLength(2),Validators.maxLength(14),Validators.pattern("^[а-яА-ЯёЁa-zA-Z0-9]+$")]),
            password: new FormControl ("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
            confirmPassword: new FormControl ("",[Validators.required,Validators.minLength(6),Validators.maxLength(15)]),
      },
      {
        validators: this.MustMatch("password", "confirmPassword")
      })
    }

    ngOnInit() {
      this.auth.user$.subscribe(x => {
        this.user = x
        if(this.user) {
          this.router.navigate[("404")]
        }
      })
      this.title.setTitle("Регистрация")
    }

 
    get name(): FormControl {
      return this.authForm.get("name") as FormControl;
    }
    get password(): FormControl {
      return this.authForm.get("password") as FormControl;
    }
    get email(): FormControl {
      return this.authForm.get("email") as FormControl;
    }

    get confirmPassword(): FormControl {
      return this.authForm.get("confirmPassword") as FormControl;
    }
  

    MustMatch(controlName:string, matchingControlName:string) {
      return (formGroup:FormGroup)=>{
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if(matchingControl.errors && !matchingControl.errors.MustMatch){
          return
        }
        if(control.value !==matchingControl.value) {
          matchingControl.setErrors({MustMatch:true})
        }
        else {
          matchingControl.setErrors(null);
        }
      }
    }
  
    CreateUser() {
        this.auth.registerUser(this.authForm.value).subscribe((result) => {
          let token = result["data"]["access_token"]
          if (token) {
            localStorage.setItem("token",token);
           this.alertify.success('Успешная регистрация'); 
            this.auth.getUser()
            this.router.navigate(["/"])               
           }
        })
    }
}