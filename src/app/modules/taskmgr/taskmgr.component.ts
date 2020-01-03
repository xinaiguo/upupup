import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-taskmgr',
  templateUrl: './taskmgr.component.html',
  styleUrls: ['./taskmgr.component.scss'],
})
export class TaskmgrComponent implements OnInit {
  darkTheme = false;
  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.getContainerElement().classList.add(dark ? 'myapp-dark-theme' : null);
  }
  constructor(private oc: OverlayContainer) { }

  ngOnInit() {
  }

}
