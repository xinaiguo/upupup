import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskmgrRoutingModule } from './taskmgr-routing.module';
import { TaskmgrComponent } from './taskmgr.component';

@NgModule({
  imports: [
    CommonModule,
    TaskmgrRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [TaskmgrComponent]
})
export class TaskmgrModule { }
