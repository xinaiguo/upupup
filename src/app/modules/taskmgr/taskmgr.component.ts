import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taskmgr',
  templateUrl: './taskmgr.component.html',
  styleUrls: ['./taskmgr.component.scss']
})
export class TaskmgrComponent implements OnInit {
  darkTheme = false;
  switchTheme(dark) {
    this.darkTheme = dark;
  }
  constructor() { }

  ngOnInit() {
  }

}
