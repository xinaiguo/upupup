import { Component, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent {
  @Output() quickTask = new EventEmitter<string>();
  desc: string;
  constructor() { }

  @HostListener('keyup.enter')
  sendQuickTask() {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim() || this.desc.length > 20) {
      return;
    }
    this.quickTask.emit(this.desc);
    this.desc = '';
  }

}
