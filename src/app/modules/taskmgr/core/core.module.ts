import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from '../util/svg.util';
import { SharedModule } from '../shared/shared.module';
import 'hammerjs';
import { TaskmgrRoutingModule } from '../taskmgr-routing.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    TaskmgrRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SharedModule,
    TaskmgrRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(ir: MatIconRegistry, ds: DomSanitizer) {
    loadSvgResources(ir, ds);
  }
}
