import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaobaoRoutingModule } from './taobao-routing.module';
import { TaobaoComponent } from './taobao.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { MainComponent } from './main/main.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    TaobaoRoutingModule
  ],
  declarations: [TaobaoComponent, HeaderComponent, SearchComponent, MainComponent, ShoppingComponent, FooterComponent]
})
export class TaobaoModule { }
