import { Component, OnInit } from '@angular/core';
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
import { Select2OptionData } from "ng-select2";
import { Options } from "select2";
import { BehaviorSubject, of } from "rxjs";
import { authService } from '../../services/authService.service';
declare var $: any;

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  settingForm = new FormGroup({
    name: new FormControl("", []),
    about: new FormControl("", []),
    user_name: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),

  })

  imageForm = new FormGroup({
    picture: new FormControl("", []),
  })
  savedFilters:any
  passChangeForm: FormGroup
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
  user$ = new BehaviorSubject<any>(null);
  public options: Options;
  public options2: Options;
  selectedFile: File
  constructor(private ReactiveFormsModule: ReactiveFormsModule,
    private http: HttpClient,
    private userService: userService,
    private auth: authService,
    private router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder,
    private alertify: AlertifyService,
    private authService: authService
  ) {

    this.passChangeForm = this.FormBuilder.group({
      pass: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      confPass: new FormControl("", [Validators.required, Validators.minLength(6)]),
    },
      {
        validators: this.MustMatch("pass", "confPass")
      })
  }

 


  ngOnInit() {
    this.auth.getUser()
    this.auth.user$.subscribe(x => {
      this.user = x
    })
  }



  get name(): FormControl {
    return this.settingForm.get("name") as FormControl;
  }

  get about(): FormControl {
    return this.settingForm.get("about") as FormControl;
  }

  get picture(): FormControl {
    return this.imageForm.get("picture") as FormControl;
  }

  get user_name(): FormControl {
    return this.settingForm.get("user_name") as FormControl;
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


  userChangeInfo(user){
    debugger
    if(!this.settingForm.value["about"]) {
      this.settingForm.value["about"] = user.about
    }

  if(!this.settingForm.value["name"]) {
    this.settingForm.value["name"] = user.name
    }
   
    if(!this.settingForm.value["user_name"]) {
    this.settingForm.value["user_name"] = user.user_name
    } 
    if(this.settingForm.value["user_name"] === user.user_name) {
      delete this.settingForm.value["user_name"]
    }
    
    
    this.userService.userChangeInfo(this.settingForm.value).subscribe((result) => {
      result
      this.alertify.success('Успешно изменено');
    })
  }

  passChage() {
    console.warn(this.passChangeForm.value.pass)
    this.userService.changePassUs(this.passChangeForm.value.pass).subscribe((result) => {
      this.alertify.success('Успешно изменено');
    })
  }
  url: string

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event: any) => {
      this.url = event.target.result
    }
    /* reader.readAsDataURL(this.selectedFile) */
    console.log(this.selectedFile);
  }


  postPicture() {
    this.userService.getPicture(this.selectedFile).subscribe((result) => {
      this.alertify.success('Картинка загружена');
      console.log(this.selectedFile);
    })
  }
}
