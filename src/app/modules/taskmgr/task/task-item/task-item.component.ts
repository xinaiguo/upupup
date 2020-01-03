import { itemAnim } from './../../anims/item.anim';
import { Component, OnInit, Input, Output, EventEmitter , HostListener} from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [itemAnim]
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in';

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckBoxClick(ev: Event) {
    ev.stopPropagation();
  }

  @HostListener('mouseenter')
  onmouseenter() {
    this.widerPriority = 'out';
  }

  @HostListener('mouseleave')
  onmouseleave() {
    this.widerPriority = 'in';
  }

}
