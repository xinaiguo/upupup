import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaobaoComponent } from './taobao.component';

const routes: Routes = [
  {
    path: '',
    component: TaobaoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaobaoRoutingModule { }
