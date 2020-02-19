import { Quote } from './../domain/quote.model';
import { Observable } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuoteService {

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  getQuote(): Observable<any> {
    const uri = `${this.config.uri}/quotes/${Math.floor(Math.random() * 10)}`;
    return this.http.get(uri);
  }

}
