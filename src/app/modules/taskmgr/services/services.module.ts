import { ProjectService } from './project.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { QuoteService } from './quote.service';

export { QuoteService };

@NgModule()
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService
      ]
    };
  }
}
