import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-taskmgr',
  templateUrl: './taskmgr.component.html',
  styleUrls: ['./taskmgr.component.scss'],
  animations: [
    trigger('square', [
      state('green', style({ 'backgroud-color': 'green', 'height': '100px', 'transform': 'translateX(0)' })),
      state('red', style({ 'background-color': 'red', 'height': '50px', 'transform': 'translateX(100%)' })),
      transition('green=>red', animate('.2s 1s')),
      transition('red=>green', animate(1000)),
    ])
  ]
})
export class TaskmgrComponent implements OnInit {
  squareState: string;
  darkTheme = false;
  switchTheme(dark) {
    this.darkTheme = dark;
    this.oc.getContainerElement().classList.add(dark ? 'myapp-dark-theme' : null);
  }
  constructor(private oc: OverlayContainer) { }

  ngOnInit() {
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }

}
