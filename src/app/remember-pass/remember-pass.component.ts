import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { Meta, Title } from '@angular/platform-browser';
import { authService } from '../services/authService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-remember-pass',
  templateUrl: './remember-pass.component.html',
  styleUrls: ['./remember-pass.component.scss']
})
export class RememberPassComponent implements OnInit {
  emailForm: FormGroup
  constructor(
    private FormBuilder: FormBuilder,
    private auth: authService,
    private meta: Meta,
    private title: Title,
    private router: Router, 
    private route: ActivatedRoute,
    private alertify:AlertifyService,
  ) {
    this.emailForm = this.FormBuilder.group({
      email: new FormControl("", [Validators.required, Validators.email]),
    })
      }

  ngOnInit() {
    this.title.setTitle("Восстановление пароля")
  }

  get email(): FormControl {
    return this.emailForm.get("email") as FormControl;
  }

  postEmail() {
    debugger
    this.auth.sendResetPassword(this.emailForm.value).subscribe((data)=> {
      console.log(data);
      this.alertify.warning('Подтвердите восстановления пороля на почте'); 
      this.router.navigate(["/"])   
      
    })
  }
}
