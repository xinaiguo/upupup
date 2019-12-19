import { RegisterComponent } from './login/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { TaskmgrComponent } from './taskmgr.component';

const routes: Routes = [
  {
    path: '',
    component: TaskmgrComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule'
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskmgrRoutingModule { }
