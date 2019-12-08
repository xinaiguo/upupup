import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskmgrComponent } from './taskmgr.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskmgrRoutingModule { }
