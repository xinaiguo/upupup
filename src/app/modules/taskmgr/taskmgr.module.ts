import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskmgrComponent } from './taskmgr.component';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LoginModule,
    ProjectModule,
    TaskModule
  ],
  declarations: [TaskmgrComponent]
})
export class TaskmgrModule { }
