import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-remember-pass',
  templateUrl: './remember-pass.component.html',
  styleUrls: ['./remember-pass.component.scss']
})
export class RememberPassComponent implements OnInit {
  emailForm: FormGroup
  constructor(
    private FormBuilder: FormBuilder,
    private meta: Meta,
    private title: Title
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

  }
}
