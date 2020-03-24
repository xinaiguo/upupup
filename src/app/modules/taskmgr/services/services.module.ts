import { ProjectService } from './project.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { QuoteService } from './quote.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';

export { QuoteService };

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService,
        TaskListService,
        TaskService
      ]
    };
  }
}
