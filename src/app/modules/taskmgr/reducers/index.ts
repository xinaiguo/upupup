import { NgModule } from '@angular/core';
import { createSelector, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from './../../../../environments/environment.prod';
import * as fromQuote from './quote.reducer';

const META_REDUCERS = !environment.production ? [storeFreeze] : [];

/**
 * 正如reducer如同数据库一样，我们顶层的state包含各个子reducer的state，并且使用一个key来标识各个子state
 */
export interface State {
    quote: fromQuote.State;
}

export const initialState: State = {
    quote: fromQuote.initialState
};

export const reducers = {
    quote: fromQuote.reducer,
};

export const getQuoteState = (state: State) => state.quote;

export const getQuote = createSelector(getQuoteState, fromQuote.getQuote);

// const productionReducer: ActionReducer<State> = combineReducers(reducers);
// /**
//  * compose函数简单来说就是接受任意数量的函数作为参数，然后返回一个新的函数。这个新的函数是前面函数的叠加，
//  * 比如说，我们给出 `compose(f(x), g(x))`, 返回的新函数就是 `g(f(x))`。
//  */

//  /**
//  * storeFreeze 用于防止 state 被修改，在 Redux 中我们必须确保 state 是不可更改的，这个函数
//  * 有助于帮我们检测 state 是否被有意或无意的修改了。当 state 发生修改时，会抛出一个异常，这一点
//  * 在开发时非常有帮助。根据环境变量的值，发布时会不包含这个函数。
//  */
// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

// export function reducer(state: any, action: any) {
//     environment.production ? productionReducer(state, action) : developmentReducer(state, action);
// }



@NgModule({
    imports: [
     /**
      * StoreModule.provideStore  仅需引入一次，请把它包含在根模块或者 CoreModule 中
      * 我们这里为了方便组织，新建了一个 AppStoreModule，但也是只在 CoreModule 中引入的
      */
        // StoreModule.forRoot(reducer),
        StoreModule.forRoot({}, {metaReducers: META_REDUCERS}),
        // RouterStoreModule.connectRouter(),
        // DevTool 需要在 StoreModule 之后导入
        StoreDevtoolsModule.instrument({
            maxAge: 5
        })
    ]
})
export class AppStoreModule { }