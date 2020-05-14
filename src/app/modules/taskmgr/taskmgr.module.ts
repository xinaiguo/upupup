import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { SharedModule } from './shared/shared.module';
import { TaskModule } from './task/task.module';
import { TaskmgrComponent } from './taskmgr.component';

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
