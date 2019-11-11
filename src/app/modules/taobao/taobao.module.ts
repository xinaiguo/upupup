import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaobaoRoutingModule } from './taobao-routing.module';
import { TaobaoComponent } from './taobao.component';

@NgModule({
  imports: [
    CommonModule,
    TaobaoRoutingModule
  ],
  declarations: [TaobaoComponent]
})
export class TaobaoModule { }
