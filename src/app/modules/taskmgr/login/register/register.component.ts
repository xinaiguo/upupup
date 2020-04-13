import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { extractInfo, isValidAddr, getAddrByCode } from '../../util/identity.util';
import { isValidDate } from '../../util/date.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  items: string[];
  sub: Subscription;
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
      dateOfBirth: [''],
      address: [],
      identity: []
    });
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(v => this.form.get('identity').valid);
      this.sub = id$.subscribe(id => {
        const info = extractInfo(id.identityNo);
        if (isValidAddr(info.addrCode)) {
          const addr = getAddrByCode(info.addrCode);
          this.form.patchValue({address: addr});
          this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
        }
        if (isValidDate(info.dateOfBirth)) {
          const date = info.dateOfBirth;
          this.form.patchValue({dateOfBirth: date});
          this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
        }
      });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
