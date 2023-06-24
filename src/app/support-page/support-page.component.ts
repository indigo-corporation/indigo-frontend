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
  url: string = window.location.href;
  defaultImage = "../../assets/favicon.ico"  
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
    this.updateMetaTags()
  }

  updateMetaTags() {
    this.meta.updateTag({ name: 'og:title', content: 'Поддержка' });
    this.meta.updateTag({ name: 'og:description', content: "Смотреть фильмы сериалы, мультфильмы и аниме онлайн в хорошем качестве 720p 1080p hd и без регистрации"});
    this.meta.updateTag({ name: 'og:image', content: this.defaultImage});
    this.meta.updateTag({ name: 'vk:image', content: this.defaultImage});
    this.meta.updateTag({ name: 'og:url', content: this.url });
    this.meta.updateTag({ name:'og:site_name', content:'IndigoFilms' });
  }


  userSendmessage() {

  }
}
