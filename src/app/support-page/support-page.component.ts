import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from "@angular/forms"
import { ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.scss']
})

export class SupportPageComponent implements OnInit {
  supportForm : FormGroup
  
  constructor(
    private FormBuilder:FormBuilder,
    private ReactiveFormsModule:ReactiveFormsModule,
    private meta: Meta,
    private title: Title 
  ) { 
    
    this.supportForm = this.FormBuilder.group({
      name: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern("[a-zA-Z ]*")]),
      about: new FormControl("", []),
      email: new FormControl("",[Validators.required,Validators.email]),
    })
  }
  
  get name(): FormControl {
    return this.supportForm.get("name") as FormControl;
  }

  get email(): FormControl {
    return this.supportForm.get("email") as FormControl;
  }

  get about(): FormControl {
    return this.supportForm.get("about") as FormControl;
  }
  ngOnInit() {
    this.title.setTitle("Поддержка")
  }

  userSendmessage() {

  }
}
