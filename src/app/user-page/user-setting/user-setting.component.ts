import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { userService } from "../../services/userservice.service"
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import * as alertyfy from 'alertifyjs';
import { AlertifyService } from '../../services/alertify.service';
import { Observable, ObservableInput } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Options } from "select2";
import { BehaviorSubject, of } from "rxjs";
import { authService } from '../../services/authService.service';
declare var $: any;
import { Meta, Title } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage,base64ToFile } from 'ngx-image-cropper';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  animations: [
    trigger('enterAnimationPage', [
      transition(':enter', [
        style({ height: '0', opacity: '0', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '*', opacity: '1', overflow: 'hidden' }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: '1', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ height: '0', opacity: '0', overflow: 'hidden' }))
      ])
    ]
    )
  ],
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  
  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  imageChangedEvent: any = '';
  public croppedImage: any;
  
  @Output() userInfoUpdate = new EventEmitter<any>();
  imageForm = new FormGroup({
    picture: new FormControl("", []),
  })
  
  savedFilters: any
  passChangeForm: FormGroup
  settingForm: FormGroup
  postUserName: FormGroup
  alert: boolean = false
  submitted: boolean = false
  repeatPass: string = 'none';
  id: any
  data: any
  term!: string
  country_id: any
  citymain: any
  user: any
  url: string
  user$ = new BehaviorSubject<any>(null);
  termAbout:string
  termName:string
  termUserName:string
  public options: Options;
  public options2: Options;

  selectedFile: File
  constructor(
    private userService: userService,
    private auth: authService,
    private FormBuilder: FormBuilder,
    private alertify: AlertifyService,
    private meta: Meta,
    private title: Title
  ) {
    this.settingForm = new FormGroup({
      name: new FormControl("", [Validators.minLength(4), Validators.maxLength(15),Validators.pattern("^[а-яА-ЯёЁa-zA-Z0-9]+$")]),
      about: new FormControl("", []),
      user_name: new FormControl("", [Validators.required,Validators.minLength(4), Validators.maxLength(15),Validators.pattern("^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$")]),
  
    })

    this.passChangeForm = this.FormBuilder.group({
      pass: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      confPass: new FormControl("", [Validators.required, Validators.minLength(6)]),
    },
      {
        validators: this.MustMatch("pass", "confPass")
      })
  }


  ngOnInit() {
    this.title.setTitle("Настройки профиля")

    this.auth.user$.subscribe(x => {
      this.user = x
      this.settingForm.patchValue({
        name: this.user.name,
        about: this.user.about,
        user_name: this.user.user_name,
      });
    })
  }


    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event: any) => {
          this.url = event.target.result
        }
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }
    imageLoaded(image: LoadedImage) {
      this.croppedImage = image
    }
    cropperReady() {
      this.croppedImage
    }
    loadImageFailed() {
        // show message
    }


  get name(): FormControl {
    return this.settingForm.get("name") as FormControl;
  }

  get about(): FormControl {
    return this.settingForm.get("about") as FormControl;
  }

  get user_name(): FormControl {
    return this.settingForm.get("user_name") as FormControl;
  }

  get picture(): FormControl {
    return this.imageForm.get("picture") as FormControl;
  }

  get pass(): FormControl {
    return this.passChangeForm.get("pass") as FormControl;
  }

  get confPass(): FormControl {
    return this.passChangeForm.get("confPass") as FormControl;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true })
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }


  userChangeInfo() {
    if(this.settingForm.value.about === null) {
      this.settingForm.value.about = " "
    }
    const formData = this.settingForm.value;
    this.userService.userChangeInfo(formData).subscribe((result) => {
     debugger
     this.auth.user$.next(formData)
      this.alertify.success('Успешно изменено');
    })
  }



  passChage() {
    this.userService.changePassUs(this.passChangeForm.value.pass).subscribe((result) => {
      this.alertify.success('Успешно изменено');
    })
  }


  postPicture() {
    let file = base64ToFile(this.croppedImage);
    const myFile = new File([file], "1.jpg", { lastModified: Date.now() });
    this.userService.getPicture(myFile).subscribe((result) => {
      this.alertify.success('Картинка загружена');
    })
  }
}
