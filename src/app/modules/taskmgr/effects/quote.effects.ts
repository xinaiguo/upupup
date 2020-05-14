import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as actions from '../actions/quote.action';
import { QuoteService } from '../services/quote.service';


@Injectable()
export class QuoteEffects {

  @Effect()
  quote$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.QUOTE)
    .switchMap(() => this.quoteService
      .getQuote()
      .map(quote => new actions.QuoteSuccessAction(quote))
      .catch(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
    );

  /**
   *
   * @param actions$
   * @param authService
   */
  constructor(private actions$: Actions, private quoteService: QuoteService) {}
}
