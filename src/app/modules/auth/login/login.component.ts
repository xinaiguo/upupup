import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public logInForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldValueValid(field: string) {
    return (
      this.logInForm.get(field).touched && this.logInForm.get(field).errors && this.logInForm.get(field).invalid
    );
  }
}
