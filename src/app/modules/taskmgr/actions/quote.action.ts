import { Action } from '@ngrx/store';
import { Quote } from '../domain';

export const ActionTypes = {
    QUOTE: '[Quote] Quote',
    QUOTE_SUCCESS: '[Quote] Quote Success',
    QUOTE_FAIL: '[Quote] Quote Fail'
};

export class QuoteAction implements Action {
    readonly type = ActionTypes.QUOTE;
    constructor(public payload: any) {
    }
  }

export class QuoteSuccessAction implements Action {
    readonly type = ActionTypes.QUOTE_SUCCESS;
    constructor(public payload: Quote) {
    }
  }

export class QuoteFailAction implements Action {
    readonly type = ActionTypes.QUOTE_FAIL;
    constructor(public payload: string) {
    }
  }

export type Actions
  = QuoteAction
  | QuoteSuccessAction
  | QuoteFailAction;

