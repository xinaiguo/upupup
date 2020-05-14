import * as quoteAction from '../actions/quote.action';
import { Quote } from './../domain';

export interface State {
    quote: Quote;
  }

export const initialState: State = {
    quote: {
        cn: '满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
        en: 'Satisfaction lies in the effort, not in the attainment. Full effort is full victory. ',
        pic: '/assets/image/quotes/2.jpg'
    }
};

export function reducer(state: State = initialState, action: quoteAction.Actions): State {
    switch (action.type) {
        case quoteAction.ActionTypes.QUOTE_SUCCESS: {
            return { ...state, quote: action.payload }; // es6 对象的拓展运算符 state对象要求不能直接修改，可以通过扩展运算符把修改路径的对象都复制一遍，然后产生一个新的对象返回
        }
        case quoteAction.ActionTypes.QUOTE_FAIL:
        default: {
            return state;
        }
    }
}


export const getQuote = (state: State) => state.quote;


