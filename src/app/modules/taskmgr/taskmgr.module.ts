import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material';

import { TaskmgrRoutingModule } from './taskmgr-routing.module';
import { TaskmgrComponent } from './taskmgr.component';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    TaskmgrRoutingModule,
    SharedModule,
    CoreModule,
    MatSidenavModule,
    LoginModule,
    ProjectModule,
    TaskModule,
  ],
  declarations: [TaskmgrComponent]
})
export class TaskmgrModule { }
