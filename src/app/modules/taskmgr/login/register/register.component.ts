import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  items: string[];
  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      repeat: ['', Validators.required],
      avatar: [img],
      dateOfBirth: ['1991-01-01']
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
