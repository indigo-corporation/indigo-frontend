import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { authService } from '../services/authService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm: FormGroup
  tokenParam:string
  constructor(
    private FormBuilder: FormBuilder,
    private auth: authService,
    private router: Router, 
    private route: ActivatedRoute,
    private alertify:AlertifyService,
  ) {
    this.resetPassForm = this.FormBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      token: new FormControl("", [Validators.required]),
    },
      {
        validators: this.MustMatch("password", "confirmPassword")
      })
  }

  get email(): FormControl {
    return this.resetPassForm.get("email") as FormControl;
  }

  
  get token(): FormControl {
    return this.resetPassForm.get("token") as FormControl;
  }

  get password(): FormControl {
    return this.resetPassForm.get("password") as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.resetPassForm.get("confirmPassword") as FormControl;
  }


  ngOnInit() {
    this.tokenParam = this.route.snapshot.params.token;
  this.resetPassForm.patchValue({
        token: this.tokenParam
      }); 
  }

  postResetPassword() {
    this.auth.resetPassword(this.resetPassForm.value).subscribe((data)=> {
      let token = data["data"]["access_token"]
      if (token) {
      localStorage.setItem("token",token);
      this.alertify.success('Успешно изменено'); 
      window.location.replace('') 
      }    
    })
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

}
