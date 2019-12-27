import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskmgrComponent } from './taskmgr.component';

const routes: Routes = [
  {
    path: '',
    component: TaskmgrComponent,
    children: [
      {
        path: '',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule'
      },
      {
        path: 'task',
        loadChildren: './task/task.module#TaskModule'
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskmgrRoutingModule { }
