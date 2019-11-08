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
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
  }

  get email() { return this.logInForm.get('email'); }
  get password() { return this.logInForm.get('password'); }


}
