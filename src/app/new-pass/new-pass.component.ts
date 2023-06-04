import { Component, OnInit } from '@angular/core';
import { FormGroup} from "@angular/forms"
import { FormControl, Validators, FormBuilder} from "@angular/forms"
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss']
})
export class NewPassComponent implements OnInit {
 
  newPassForm:FormGroup

  constructor(
    private router: Router, 
    private ReactiveFormsModule:ReactiveFormsModule,
    private formBuilder: FormBuilder,
  ) {
    this.newPassForm = this.formBuilder.group({
      password: new FormControl ("",[ Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      confirmPassword: new FormControl ("",[Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    },
    {
        validators: this.MustMatch("password", "confirmPassword")
    })
    console.log(this.newPassForm);
    
   
  }

  ngOnInit() {
    console.log(this.newPassForm.value);
  }

  onSubmit() {
    console.log(this.newPassForm.value);
    
  }

  get password(): FormControl {
    return this.newPassForm.get("password") as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.newPassForm.get("confirmPassword") as FormControl;
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

}
