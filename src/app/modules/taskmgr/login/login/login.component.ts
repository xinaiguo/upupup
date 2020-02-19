import { ServicesModule } from './../../services/services.module';
import { QuoteService } from './../../services/quote.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  quote: Quote = {
    'cn': '不要只因一次挫败，就放弃你原来决心想达到的梦想。（莎士比亚）',
    'en': 'Do not, for one repulse, forgo the purpose that you resolved to effect.',
    'pic': '/assets/image/quotes/2.jpg'
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) { 
    this.quoteService$.getQuote().subscribe(q => this.quote = q);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['xinai@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
  }

  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }

    const pattern = /^xin+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with xin'
    };
  }

}


